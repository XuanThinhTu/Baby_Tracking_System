import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WeightChart = ({ userData }) => {
    // Example WHO Growth Chart Data with 9 SD Lines
    const growthData = [
        { month: 0, SD4neg: 1.915, SD3neg: 2.303, SD2neg: 2.690, SD1neg: 3.126, SD0: 3.614, SD1: 4.157, SD2: 4.761, SD3: 5.431, SD4: 6.100 },
        { month: 1, SD4neg: 2.618, SD3neg: 3.080, SD2neg: 3.541, SD1neg: 4.061, SD0: 4.646, SD1: 5.303, SD2: 6.038, SD3: 6.861, SD4: 7.684 },
        { month: 2, SD4neg: 3.183, SD3neg: 3.701, SD2neg: 4.219, SD1neg: 4.804, SD0: 5.464, SD1: 6.207, SD2: 7.043, SD3: 7.983, SD4: 8.923 },
        { month: 3, SD4neg: 3.627, SD3neg: 4.189, SD2neg: 4.751, SD1neg: 5.387, SD0: 6.106, SD1: 6.919, SD2: 7.837, SD3: 8.875, SD4: 9.913 },
        { month: 4, SD4neg: 3.987, SD3neg: 4.585, SD2neg: 5.183, SD1neg: 5.861, SD0: 6.630, SD1: 7.502, SD2: 8.492, SD3: 9.615, SD4: 10.739 },
        // Add more months following the extracted data...
    ];

    return (
        <div className="w-full px-4 py-12"> {/* Tăng padding để tạo khoảng cách trên dưới */}
            <div className="flex justify-between items-center mb-6"> {/* Tạo khoảng cách với biểu đồ */}
                <h3 className="text-2xl font-bold">Cân nặng</h3> {/* Tăng kích thước chữ */}
                <a href="#" className="text-blue-500 text-lg hover:underline">Chỉ số tiêu chuẩn</a> {/* Tăng kích thước chữ */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                    <XAxis dataKey="month" tickFormatter={(m) => `${m}thg`} />
                    <YAxis domain={[0, 15]} label={{ value: "kg", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    {Object.keys(growthData[0]).slice(1).map((key, index) => (
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
                        <Line type="monotone" dataKey="weight" data={userData} stroke="#007bff" dot={{ r: 4 }} />
                    )}
                </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center items-center mt-6 text-lg text-purple-500">
                <a href="#" className="hover:underline flex items-center">
                    Xem chi tiết <span className="ml-1">&gt;</span>
                </a>
                <span className="mx-4 border-l border-gray-300 h-5"></span> {/* Đường phân cách */}
                <a href="#" className="hover:underline flex items-center">
                    Xem toàn màn hình <span className="ml-1">&gt;</span>
                </a>
            </div>

        </div>
    );
};

export default WeightChart;
