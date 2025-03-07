import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getBabyGrowthData,
  getBabyInfo,
  getBoyStandardIndex,
  getGirlStandardIndex,
} from "../../../../services/APIServices";
import dayjs from "dayjs";

// Nhóm màu mới
const colorMap = {
  SD4neg: "#FF0000", // Đỏ - Nhóm SD1neg - SD4neg (Ngưỡng dưới)
  SD3neg: "#FF0000",
  SD2neg: "#FF0000",
  SD1neg: "#FF0000",
  SD0: "#008000", // Xanh lá - Ngưỡng trung bình (SD0)
  SD1: "#1E90FF", // Xanh dương - Nhóm SD1 - SD4 (Ngưỡng trên)
  SD2: "#1E90FF",
  SD3: "#1E90FF",
  SD4: "#1E90FF",
};

const HeadCirChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [userData, setUserData] = useState([]);
  const [growthData, setGrowthData] = useState([]);

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
    const fecthGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        console.log(result);
        const formattedData = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measureAt),
          headCir: item.headCircumference,
        }));

        setUserData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fecthGrowthData();
  }, [baby, babyId]);

  useEffect(() => {
    const fetchHeadCirData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formattedData = result.map((item) => ({
          day: item.period,
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

        setGrowthData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeadCirData();
  }, [baby]);

  return (
    <div className="w-full px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Chu vi đầu</h3>
        <a href="#" className="text-blue-500 text-lg hover:underline">
          Chỉ số tiêu chuẩn
        </a>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={growthData}>
          <XAxis
            dataKey="day"
            type="number"
            tickFormatter={(m) => `${m} day`}
          />
          <YAxis
            domain={[0, 15]}
            label={{ value: "cm", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {growthData.length > 0 &&
            Object.keys(growthData[0])
              .slice(1)
              .map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colorMap[key]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Chú thích màu sắc */}
      <div className="flex justify-center mt-4 text-sm">
        <div className="flex items-center mx-4">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></span>
          Ngưỡng dưới (SD1neg - SD4neg)
        </div>
        <div className="flex items-center mx-4">
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
          Ngưỡng trung bình (SD0)
        </div>
        <div className="flex items-center mx-4">
          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
          Ngưỡng trên (SD1 - SD4)
        </div>
      </div>

      {/* Links */}
      <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
        <a href="#" className="hover:underline flex items-center">
          Xem chi tiết <span className="ml-1">&gt;</span>
        </a>
        <span className="mx-4 border-l border-gray-300 h-5"></span>
        <a href="#" className="hover:underline flex items-center">
          Xem toàn màn hình <span className="ml-1">&gt;</span>
        </a>
      </div>
    </div>
  );
};

export default HeadCirChart;
