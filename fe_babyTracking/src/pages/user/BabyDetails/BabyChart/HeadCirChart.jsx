import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  getBabyGrowthData,
  getBabyInfo,
  getBoyStandardIndex,
  getGirlStandardIndex,
  getPredictGrowthData,
} from "../../../../services/APIServices";
import dayjs from "dayjs";

const HeadCirChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]); // SD lines
  const [userData, setUserData] = useState([]); // Baby's data
  const [predictData, setPredictData] = useState([]);

  // Calculate days (relative to birthDate)
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

  // Fetch baby's actual data (headCircumference)
  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        const formatted = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measuredAt),
          headCir: item.headCircumference,
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
          predictHeadCir: item.predictedHeadCircumference,
        }));
        // Get the last day's data of the baby and convert it to an object with 2 properties: day and predictHeadCir
        const lastDayData = userData[userData.length - 1];
        const lastDayPredict = {
          day: lastDayData.day,
          predictHeadCir: lastDayData.headCir,
        };

        setPredictData([lastDayPredict, ...formattedData]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPredictData();
  }, [baby, babyId, userData]);

  // Fetch standard data (headCircumference)
  useEffect(() => {
    const fetchHeadCirData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formatted = result.map((item) => ({
          day: item.periodType === "DAY" ? item.period : item.period * 30 + 56, // days
          SD4neg: item.headCircumferenceNeg4Sd,
          SD3neg: item.headCircumferenceNeg3Sd,
          SD2neg: item.headCircumferenceNeg2Sd,
          SD1neg: item.headCircumferenceNeg1Sd,
          SD0: item.headCircumferenceMedian,
          SD1: item.headCircumferencePos1Sd,
          SD2: item.headCircumferencePos2Sd,
          SD3: item.headCircumferencePos3Sd,
          SD4: item.headCircumferencePos4Sd,
        }));
        setGrowthData(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeadCirData();
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

  // === Calculate Y domain "center" around userData (ignoring SD lines) ===
  // Calculate Y domain based on comparison between baby's data and standard index
  let yMin = 0;
  let yMax = 60; // fallback

  if (userData.length && growthData.length) {
    const babyHeadCir = userData.map((d) => d.headCir);
    const babyMin = Math.min(...babyHeadCir);
    const babyMax = Math.max(...babyHeadCir);

    const babyMinDay = userData.find((d) => d.headCir === babyMin).day;
    const babyMaxDay = userData.find((d) => d.headCir === babyMax).day;

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
            if (name === "headCir") {
              return [`${value} cm`, "Baby's Head Circumference"];
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
            dataKey="headCir"
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
            dataKey="predictHeadCir"
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
    <div className="w-full px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Head Circumference</h3>
        <a href="#" className="text-blue-500 text-lg hover:underline">
          Standard Index
        </a>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 600 }}>{renderChart()}</div>

      <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
        <a href="#" className="hover:underline flex items-center">
          View Details <span className="ml-1">&gt;</span>
        </a>
        <span className="mx-4 border-l border-gray-300 h-5"></span>
        <a href="#" className="hover:underline flex items-center">
          View Fullscreen <span className="ml-1">&gt;</span>
        </a>
      </div>
    </div>
  );
};

export default HeadCirChart;