import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getBabyGrowthData,
  getBabyInfo,
  getBoyStandardIndex,
  getGirlStandardIndex,
} from "../../../../services/APIServices";
import dayjs from "dayjs";

const WeightChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [userData, setUserData] = useState([]);

  const calculateDays = (birthDate, measuredAt) => {
    const birth = dayjs(birthDate);
    const measured = dayjs(measuredAt);
    return measured.diff(birth, "day");
  };

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
  }, []);

  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        const formattedData = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measuredAt),
          height: item.height,
          weight: item.weight,
        }));

        setUserData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [baby, babyId]);

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        if (!baby) return;

        const result =
          baby?.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formattedData = result.map((item) => ({
          day: item.period,
          SD4neg: item.weightNeg4Sd,
          SD3neg: item.weightNeg3Sd,
          SD2neg: item.weightNeg2Sd,
          SD1neg: item.weightNeg1Sd,
          SD0: item.weightMedian,
          SD1: item.weightPos1Sd,
          SD2: item.weightPos2Sd,
          SD3: item.weightPos3Sd,
          SD4: item.weightPos4Sd,
        }));

        setGrowthData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeightData();
  }, [baby]);

  return (
    <div className="w-full px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Cân nặng</h3>
        <a href="#" className="text-blue-500 text-lg hover:underline">
          Chỉ số tiêu chuẩn
        </a>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={growthData}>
          <XAxis
            dataKey="day"
            type="number"
            tickFormatter={(m) => `${m}day`}
            domain={[0, "dataMax"]}
            scale="time"
          />
          <YAxis
            domain={[0, 15]}
            label={{ value: "kg", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          {growthData.length > 0 &&
            Object.keys(growthData[0])
              .slice(1)
              .map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={index < 3 ? "#000" : index < 6 ? "#f00" : "#0a0"}
                  strokeDasharray={index === 4 ? "5 5" : ""}
                />
              ))}
          {/* User Data (Actual Recorded Weights) */}
          {userData && userData.length > 0 && (
            <Line
              type="monotone"
              dataKey="weight"
              data={userData}
              stroke="#007bff"
              dot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
        <a href="#" className="hover:underline flex items-center">
          Xem chi tiết <span className="ml-1">&gt;</span>
        </a>
        <span className="mx-4 border-l border-gray-300 h-5"></span>{" "}
        {/* Đường phân cách */}
        <a href="#" className="hover:underline flex items-center">
          Xem toàn màn hình <span className="ml-1">&gt;</span>
        </a>
      </div>
    </div>
  );
};

export default WeightChart;
