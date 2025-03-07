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
} from "../../../../services/APIServices";
import dayjs from "dayjs";

const HeadCirChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]); // SD lines
  const [userData, setUserData] = useState([]);     // data bé

  // Lấy ngày (so với birthDate)
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

  // Lấy dữ liệu thực bé (headCircumference)
  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        // Thay measureAt nếu API là measureAt, 
        // hoặc item.measuredAt nếu đó là field chuẩn
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

  // Lấy dữ liệu chuẩn (headCircumference)
  useEffect(() => {
    const fetchHeadCirData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formatted = result.map((item) => ({
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
        setGrowthData(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeadCirData();
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

  // === Tính domain Y “center” quanh userData (bỏ qua SD lines) ===
  let yMin = 0;
  let yMax = 60; // fallback nếu userData rỗng

  if (userData.length > 0) {
    const userMin = Math.min(...userData.map((d) => d.headCir));
    const userMax = Math.max(...userData.map((d) => d.headCir));
    const mid = (userMin + userMax) / 2;
    let range = userMax - userMin;
    if (range < 1) range = 1; // tránh chia 0

    // Tăng factor => domain rộng hơn
    const factor = 6; // tuỳ ý
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
          label={{ value: "cm", angle: -90, position: "insideLeft" }}
        />

        {/* Tooltip */}
        <Tooltip
          labelFormatter={(dayValue) => `Ngày: ${dayValue}`}
          formatter={(value, name) => {
            if (name === "headCir") {
              return [`${value} cm`, "Chu vi đầu Bé"];
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

        {/* Đường dữ liệu bé */}
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
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Chu vi đầu</h3>
        <a href="#" className="text-blue-500 text-lg hover:underline">
          Chỉ số tiêu chuẩn
        </a>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 600 }}>{renderChart()}</div>

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
