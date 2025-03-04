import React from "react";

const BMICalculator = () => {
    return (
        <div className="w-full">
            {/* Header nằm trên, spanning toàn bộ chiều ngang */}
            <header className="bg-blue-500 text-white p-4">
                <h2 className="text-2xl font-bold">BMI Calculator for Child and Teen</h2>
            </header>

            {/* Khu vực nội dung chia đôi */}
            <div className="flex">
                {/* Left Form Section */}
                <div className="w-1/2 p-6 border-r">
                    {/* SEX */}
                    <div className="mt-4">
                        <label className="block font-semibold">SEX</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input type="radio" name="sex" value="boy" className="mr-2" /> Boy
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="sex" value="girl" className="mr-2" /> Girl
                            </label>
                        </div>
                    </div>

                    {/* AGE */}
                    <div className="mt-4">
                        <label className="block font-semibold">AGE</label>
                        <div className="flex items-center gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="ageType"
                                    value="yearsMonths"
                                    className="mr-2"
                                    defaultChecked
                                />
                                Years, Months
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="ageType" value="months" className="mr-2" /> Months
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="ageType" value="dob" className="mr-2" /> Date of Birth, Date of Measurement
                            </label>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <input
                                type="number"
                                min="2"
                                max="19"
                                placeholder="years (2 to 19)"
                                className="border rounded p-2 w-1/2"
                            />
                            <input
                                type="number"
                                min="0"
                                max="11"
                                placeholder="months (0 to 11)"
                                className="border rounded p-2 w-1/2"
                            />
                        </div>
                    </div>

                    {/* HEIGHT */}
                    <div className="mt-4">
                        <label className="block font-semibold">HEIGHT</label>
                        <input
                            type="number"
                            placeholder="centimeters (cm)"
                            className="border rounded p-2 mt-1 w-1/3"
                        />
                    </div>

                    {/* WEIGHT */}
                    <div className="mt-4">
                        <label className="block font-semibold">
                            WEIGHT <span className="text-gray-500 text-sm">(decimal places allowed)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="kilograms (kg)"
                            className="border rounded p-2 mt-1 w-1/3"
                        />
                    </div>

                    {/* Calculate Button */}
                    <div className="mt-6">
                        <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded w-full">
                            Calculate
                        </button>
                    </div>

                </div>

                {/* Right BMI Chart Section */}
                <div className="w-1/2 h-full flex flex-col p-6 bg-white">
                    {/* Tiêu đề */}
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-4 w-full">
                        BMI Calculator Chart
                    </h2>

                    {/* Vùng bảng */}
                    <div className="flex-grow w-full flex flex-col justify-center">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left font-medium text-gray-700 text-lg">BMI</th>
                                    <th className="p-4 text-left font-medium text-gray-700 text-lg">Weight status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-base">
                                <tr className="border-t border-b border-gray-300">
                                    <td className="p-4 font-semibold">Below 18.5</td>
                                    <td className="p-4 text-blue-600">Underweight</td>
                                </tr>
                                <tr className="border-t border-b border-gray-300">
                                    <td className="p-4 font-semibold">18.5 - 24.9</td>
                                    <td className="p-4 text-green-600">Healthy</td>
                                </tr>
                                <tr className="border-t border-b border-gray-300">
                                    <td className="p-4 font-semibold">25.0 - 29.9</td>
                                    <td className="p-4 text-orange-600">Overweight</td>
                                </tr>
                                <tr className="border-t border-b border-gray-300">
                                    <td className="p-4 font-semibold">30.0 - and Above</td>
                                    <td className="p-4 text-red-600">Obese</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Ghi chú */}
                    <p className="mt-4 text-center text-sm text-gray-500 w-full">
                        * BMR Metabolic Rate / BMI Body Mass Index
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;
