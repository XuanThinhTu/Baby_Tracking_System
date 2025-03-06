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

const HeightChart = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]); // Dữ liệu chuẩn
  const [userData, setUserData] = useState([]);     // Dữ liệu của bé
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Tính số ngày từ ngày sinh đến ngày đo
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
  }, [babyId]);

  // Lấy dữ liệu thực của bé
  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!baby) return;
      try {
        const result = await getBabyGrowthData(babyId);
        const formattedUserData = result.map((item) => ({
          day: calculateDays(baby.birthDate, item.measuredAt), // số ngày
          height: item.height,
          weight: item.weight,
        }));
        setUserData(formattedUserData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [baby, babyId]);

  // Lấy dữ liệu chuẩn
  useEffect(() => {
    const fetchHeightData = async () => {
      if (!baby) return;
      try {
        const result =
          baby.gender === "Boy"
            ? await getBoyStandardIndex()
            : await getGirlStandardIndex();

        const formattedData = result?.map((item) => ({
          day: item.period, // vẫn tính theo ngày
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
        setGrowthData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeightData();
  }, [baby]);

  // Tính domain X
  const userMaxDay = userData.length
    ? Math.max(...userData.map((d) => d.day))
    : 0;
  const domainMax = userMaxDay + 60; // Dư 60 ngày (~2 tháng)

  // Tạo mảng ticks bội số 30 (1 tháng, 2 tháng...)
  // => 30 -> "1", 60 -> "2", ...
  const ticks = [];
  // Bắt đầu từ 30, cứ +30, đến khi >= domainMax
  for (let i = 30; i <= domainMax; i += 30) {
    ticks.push(i);
  }

  // Hàm render chart
  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={growthData} margin={{ right: 20 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="" />

        <XAxis
          dataKey="day"
          type="number"
          domain={[0, domainMax]}
          // scale linear
          scale="linear"
          // Gán ticks bội số 30
          ticks={ticks}
          // Format: 30 => "1", 60 => "2", ...
          tickFormatter={(dayValue) => `${dayValue / 30}`}
          // Thêm label trục X, nếu muốn
          label={{
            value: "Tháng",
            position: "insideBottomRight",
            offset: 0,
          }}
        />

        <YAxis
          domain={[0, 130]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]}
          label={{ value: "cm", angle: -90, position: "insideLeft" }}
        />

        {/* Các đường chuẩn (SD lines) */}
        {growthData.length > 0 &&
          Object.keys(growthData[0])
            .filter((key) => key !== "day") // Bỏ cột day
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

        {/* Đường dữ liệu của bé */}
        {userData.length > 0 && (
          <Line
            type="monotone"
            dataKey="height"
            data={userData}
            stroke="#007bff"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}

        {/* Brush để kéo vùng xem (tùy chọn) */}
        <Brush dataKey="day" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <div className="w-full px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Chiều cao</h3>
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
              <span className="font-bold text-lg">Biểu đồ Chiều Cao</span>
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
