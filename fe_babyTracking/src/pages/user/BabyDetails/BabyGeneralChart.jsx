import React from "react";
import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from "recharts";

const BabyGeneralChart = () => {
    const data = [
        { name: "BMI", value: 127, fill: "#E2A04A" }, // Vàng - Inner
        { name: "Chiều cao", value: 106, fill: "#9ACA3C" }, // Xanh lá - Middle
        { name: "Cân nặng", value: 136, fill: "#4A90E2" }, // Xanh dương - Outer
    ];

    return (
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Chỉ số của bé</h3>
                <a href="#" className="text-blue-500 text-sm hover:underline">Xem chi tiết</a>
            </div>

            {/* Chart Section */}
            <div className="w-full flex justify-center">
                <RadialBarChart
                    width={400}  // Giảm kích thước
                    height={400} // Giảm kích thước
                    cx="50%"
                    cy="50%"
                    innerRadius="25%"
                    outerRadius="100%"
                    barSize={30} // Giảm kích thước thanh biểu đồ
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
