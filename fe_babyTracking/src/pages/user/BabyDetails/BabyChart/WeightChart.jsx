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
} from "../../../../services/APIServices";
import dayjs from "dayjs";

const WeightChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]); // Dữ liệu chuẩn (SD lines)
  const [userData, setUserData] = useState([]);     // Dữ liệu bé

  // Tính ngày so với birthDate
  const calculateDays = (birthDate, measuredAt) => {
    const birth = dayjs(birthDate);
    const measured = dayjs(measuredAt);
    return measured.diff(birth, "day");
  };

  // Lấy thông tin bé
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

  // Lấy dữ liệu thực (weight) của bé
  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        const formattedData = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measuredAt),
          weight: item.weight,
          height: item.height,
        }));
        setUserData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [baby, babyId]);

  // Lấy dữ liệu chuẩn (weight)
  useEffect(() => {
    const fetchWeightData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
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

  // === Tính domain X ===
  const userMaxDay = userData.length
    ? Math.max(...userData.map((d) => d.day))
    : 0;
  const domainMax = userMaxDay + 60; // Dư 60 ngày

  // Tạo mảng tick bội số 30 => hiển thị "tháng"
  const ticks = [];
  for (let i = 30; i <= domainMax; i += 30) {
    ticks.push(i);
  }

  // === Tính domain Y “center” quanh dữ liệu bé (bỏ qua SD lines) ===
  let yMin = 0;
  let yMax = 30; // fallback nếu userData rỗng

  if (userData.length > 0) {
    const userMin = Math.min(...userData.map((d) => d.weight));
    const userMax = Math.max(...userData.map((d) => d.weight));
    const mid = (userMin + userMax) / 2;
    let range = userMax - userMin;
    if (range < 1) range = 1; // tránh chia 0

    // factor=6 => domain rộng hơn
    const factor = 6;
    const half = (range * factor) / 2;

    yMin = mid - half;
    if (yMin < 0) yMin = 0;
    yMax = mid + half;
  }

  // Render chart
  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={growthData} margin={{ right: 20 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="" />

        {/* Trục X */}
        <XAxis
          dataKey="day"
          type="number"
          domain={[0, domainMax]}
          scale="linear"
          ticks={ticks}
          tickFormatter={(val) => `${val / 30}`}
          label={{ value: "Tháng", position: "insideBottomRight", offset: 0 }}
        />

        {/* Trục Y */}
        <YAxis
          domain={[yMin, yMax]}
          label={{ value: "kg", angle: -90, position: "insideLeft" }}
        />

        {/* Tooltip */}
        <Tooltip
          labelFormatter={(dayValue) => `Ngày: ${dayValue}`}
          formatter={(value, name) => {
            if (name === "weight") {
              return [`${value} kg`, "Cân nặng Bé"];
            }
            // SD lines => hiển thị raw
            return [value, name];
          }}
        />

        {/* Đường SD */}
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

        {/* Đường dữ liệu Bé */}
        {userData.length > 0 && (
          <Line
            type="monotone"
            dataKey="weight"
            data={userData}
            stroke="#007bff"
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
        <h3 className="text-2xl font-bold">Cân nặng</h3>
        <a href="#" className="text-blue-500 text-lg hover:underline">
          Chỉ số tiêu chuẩn
        </a>
      </div>

      {/* Chart container */}
      <div style={{ width: "100%", height: 600 }}>{renderChart()}</div>

      {/* Link Xem chi tiết / Xem toàn màn hình */}
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

export default WeightChart;
