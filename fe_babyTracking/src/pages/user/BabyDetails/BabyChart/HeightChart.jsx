import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  getBabyGrowthData,
  getBabyInfo,
  getBoyStandardIndex,
  getGirlStandardIndex,
  getPredictGrowthData,
} from "../../../../services/APIServices";
import dayjs from "dayjs";

const HeightChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]); // Standard data (SD lines)
  const [userData, setUserData] = useState([]); // Baby's data
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [predictData, setPredictData] = useState([]);

  // Function to calculate days from birth date
  const calculateDays = (birthDate, measuredAt) => {
    const birth = dayjs(birthDate);
    const measured = dayjs(measuredAt);
    return measured.diff(birth, "day");
  };

  // Function to find the closest standard data to the target day
  const getClosestStandardData = (targetDay) =>
    growthData.reduce((closest, current) =>
      Math.abs(current.day - targetDay) < Math.abs(closest.day - targetDay)
        ? current
        : closest
    );

  // Function to get an array of standard values from standard data
  const getStandardValues = (data) => [
    data.SD4neg,
    data.SD3neg,
    data.SD2neg,
    data.SD1neg,
    data.SD0,
    data.SD1,
    data.SD2,
    data.SD3,
    data.SD4,
  ];

  // Fetch baby info
  useEffect(() => {
    const fetchBabyInfo = async () => {
      try {
        const result = await getBabyInfo(babyId);
        setBaby(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBabyInfo();
  }, [babyId]);

  // Fetch baby's actual data
  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        const formatted = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measuredAt),
          height: item.height,
          weight: item.weight,
        }));
        setUserData(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [baby, babyId]);

  // Fetch predicted growth data
  useEffect(() => {
    const fetchPredictData = async () => {
      if (!baby || !userData.length) return;
      try {
        const result = await getPredictGrowthData(babyId);
        const formattedData = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.predictedDate),
          predictHeight: item.predictedHeight,
        }));
        // Get the last day's data of the baby and convert it to an object with 2 properties: day and predictHeight
        const lastDayData = userData[userData.length - 1];
        const lastDayPredict = {
          day: lastDayData.day,
          predictHeight: lastDayData.height,
        };

        setPredictData([lastDayPredict, ...formattedData]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPredictData();
  }, [baby, babyId, userData]);

  // Fetch standard data
  useEffect(() => {
    const fetchHeightData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formatted = result?.map((item) => ({
          day: item.periodType === "DAY" ? item.period : item.period * 30 + 56, // days
          SD4neg: item.heightNeg4Sd,
          SD3neg: item.heightNeg3Sd,
          SD2neg: item.heightNeg2Sd,
          SD1neg: item.heightNeg1Sd,
          SD0: item.heightMedian,
          SD1: item.heightPos1Sd,
          SD2: item.heightPos2Sd,
          SD3: item.heightPos3Sd,
          SD4: item.heightPos4Sd,
        }));
        setGrowthData(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeightData();
  }, [baby]);

  // === Calculate X domain ===
  // Get the maximum day of the baby + 60
  const userMaxDay = userData.length
    ? Math.max(...userData.map((d) => d.day))
    : Math.max(...growthData.map((d) => d.day));

  const domainMax = userMaxDay + 60; // Add 60 days buffer

  // Create an array of ticks as multiples of 30 => display "months"
  const ticks = [];
  let period = userData.length ? 30 : 365;
  for (let i = period; i <= domainMax; i += period) {
    ticks.push(i);
  }

  // === Calculate Y domain "center" around baby's data (ignoring SD lines) ===
  // Calculate Y domain based on comparison between baby's data and standard index
  let yMin = 0;
  let yMax = 130; // fallback

  if (userData.length && growthData.length) {
    const babyHeights = userData.map((d) => d.height);
    const babyMin = Math.min(...babyHeights);
    const babyMax = Math.max(...babyHeights);

    const babyMinDay = userData.find((d) => d.height === babyMin).day;
    const babyMaxDay = userData.find((d) => d.height === babyMax).day;

    const closestStandardMin = getClosestStandardData(babyMinDay);
    const closestStandardMax = getClosestStandardData(babyMaxDay);

    const standardMin = Math.min(...getStandardValues(closestStandardMin));
    const standardMax = Math.max(...getStandardValues(closestStandardMax));

    yMin = Math.min(babyMin, standardMin);
    yMax = Math.max(babyMax, standardMax);
    if (yMin < 0) yMin = 0;
  }

  // Render chart
  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={growthData} margin={{ right: 20 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="" />

        {/* X Axis */}
        <XAxis
          dataKey="day"
          type="number"
          domain={[0, domainMax]}
          scale="linear"
          ticks={ticks}
          interval={0}
          tickFormatter={(val) =>
            userData.length ? `${val / 30}` : `${val / 365}`
          }
          label={{
            value: userData.length ? "Months" : "Years",
            position: "insideBottomRight",
            offset: 0,
          }}
        />

        {/* Y Axis */}
        <YAxis
          domain={[yMin, yMax]}
          label={{ value: "cm", angle: -90, position: "insideLeft" }}
        />

        {/* Tooltip */}
        <Tooltip
          labelFormatter={(dayValue) => `Day: ${dayValue}`}
          formatter={(value, name) => {
            if (name === "height") {
              return [`${value} cm`, "Baby's Height"];
            }
            // SD lines => display raw
            return [value, name];
          }}
        />

        {/* SD Lines */}
        {growthData.length > 0 &&
          Object.keys(growthData[0])
            .filter((key) => key !== "day")
            .map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={index < 3 ? "#000" : index < 6 ? "#f00" : "#0a0"}
                strokeDasharray={index === 4 ? "5 5" : ""}
                activeDot={false}
                dot={false}
              />
            ))}

        {/* Baby's Data Line */}
        {userData.length > 0 && (
          <Line
            type="monotone"
            dataKey="height"
            data={userData}
            stroke="#007bff"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        )}

        {/* Predicted Data Line */}
        {predictData.length > 0 && (
          <Line
            type="monotone"
            dataKey="predictHeight"
            data={predictData}
            stroke="gray"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <div className="w-full px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Height</h3>
          <a
            href="#"
            className="text-blue-500 text-lg hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setIsFullScreen(true);
            }}
          >
            Standard Index
          </a>
        </div>

        {/* Chart */}
        <div style={{ width: "100%", height: 600 }}>{renderChart()}</div>

        <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
          <a
            href="#"
            className="hover:underline flex items-center"
            onClick={(e) => {
              e.preventDefault();
              setIsFullScreen(true);
            }}
          >
            View Details <span className="ml-1">&gt;</span>
          </a>
          <span className="mx-4 border-l border-gray-300 h-5"></span>
          <a
            href="#"
            className="hover:underline flex items-center"
            onClick={(e) => {
              e.preventDefault();
              setIsFullScreen(true);
            }}
          >
            View Fullscreen <span className="ml-1">&gt;</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full h-full flex flex-col">
            <div className="relative border-b p-4 flex items-center justify-center">
              <span className="font-bold text-lg">Height Chart</span>
              <button
                className="absolute right-4 text-gray-600 hover:text-gray-800"
                onClick={() => setIsFullScreen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9.293l4.646-4.647a.5.5 0 01.708.708L10.707 
                      10l4.647 4.646a.5.5 0 01-.708.708L10 10.707l-4.646 
                      4.647a.5.5 0 01-.708-.708L9.293 10 4.646 
                      5.354a.5.5 0 01.708-.708L10 9.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4">{renderChart()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeightChart;
