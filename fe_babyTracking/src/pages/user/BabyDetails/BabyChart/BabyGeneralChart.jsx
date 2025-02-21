import React from "react";
import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from "recharts";

const BabyGeneralChart = () => {
    const data = [
        { name: "BMI", value: 127, fill: "#E2A04A" }, // Vàng - Inner
        { name: "Chiều cao", value: 106, fill: "#9ACA3C" }, // Xanh lá - Middle
        { name: "Cân nặng", value: 136, fill: "#4A90E2" }, // Xanh dương - Outer
    ];

    return (
        <div className="w-full px-4 py-12"> {/* Tăng khoảng cách trên dưới */}
            {/* Header */}
            <div className="flex justify-between items-center mb-6"> {/* Thêm margin-bottom để tạo khoảng cách */}
                <h3 className="text-2xl font-bold">Chỉ số của bé</h3> {/* Tăng kích thước chữ lên 2xl */}
                <a href="#" className="text-blue-500 text-lg hover:underline">Xem chi tiết</a> {/* Tăng kích thước chữ lên lg */}
            </div>

            {/* Chart Section */}
            <div className="w-full flex justify-center">
                <RadialBarChart
                    width={400}
                    height={400}
                    cx="50%"
                    cy="50%"
                    innerRadius="25%"
                    outerRadius="100%"
                    barSize={30}
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >
                    <PolarAngleAxis type="number" domain={[0, 140]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" angleAxisId={0} label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }} />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                </RadialBarChart>
            </div>
        </div>


    );
};

export default BabyGeneralChart;
