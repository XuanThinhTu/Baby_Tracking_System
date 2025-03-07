import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
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

  // Lấy dữ liệu chuẩn (weight) theo giới tính
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
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        // Format data: { day, SD4neg, SD3neg, ... SD4 }
        const formattedData = result.map((item) => ({
          day: item.period, // ngày
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

  // Xác định domain X quanh data user (nếu có)
  const userMaxDay = userData && userData.length
    ? Math.max(...userData.map((d) => d.day))
    : 0;
  // Cho dư 60 ngày (~2 tháng)
  const domainMax = userMaxDay + 60;

  // Tạo mảng tick bội số 30 => hiển thị tháng
  const ticks = [];
  for (let i = 30; i <= domainMax; i += 30) {
    ticks.push(i);
  }

  // Render chart
  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={growthData} margin={{ right: 20 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="" />

        <XAxis
          dataKey="day"
          type="number"
          domain={[0, domainMax]}
          scale="linear"
          ticks={ticks}
          tickFormatter={(dayValue) => `${dayValue / 30}`} // 30 => "1", 60 => "2", ...
          label={{
            value: "Tháng",
            position: "insideBottomRight",
            offset: 0,
          }}
        />

        <YAxis
          domain={[0, 30]} // Giả sử hiển thị đến 30 kg
          ticks={[0, 5, 10, 15, 20, 25, 30]}
          label={{ value: "kg", angle: -90, position: "insideLeft" }}
        />

        {/* Các đường chuẩn (SD lines) */}
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

        {/* Đường dữ liệu thực của bé */}
        {userData && userData.length > 0 && (
          <Line
            type="monotone"
            dataKey="weight"
            data={userData}
            stroke="#007bff"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}

        {/* Brush để kéo vùng xem */}
        <Brush dataKey="day" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <div className="w-full px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Cân nặng</h3>
          <a
            href="#"
            className="text-blue-500 text-lg hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setIsFullScreen(true);
            }}
          >
            Chỉ số tiêu chuẩn
          </a>
        </div>

        {/* Chart container */}
        <div style={{ width: "100%", height: 600 }}>{renderChart()}</div>

        {/* Link Xem chi tiết / Xem toàn màn hình */}
        <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
          <a
            href="#"
            className="hover:underline flex items-center"
            onClick={(e) => {
              e.preventDefault();
              setIsFullScreen(true);
            }}
          >
            Xem chi tiết <span className="ml-1">&gt;</span>
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
            Xem toàn màn hình <span className="ml-1">&gt;</span>
          </a>
        </div>
      </div>

      {/* Modal toàn màn hình */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full h-full flex flex-col">
            <div className="relative border-b p-4 flex items-center justify-center">
              <span className="font-bold text-lg">Biểu đồ Cân Nặng</span>
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

export default WeightChart;
