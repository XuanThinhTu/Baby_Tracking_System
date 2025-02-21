import React from "react";
import { Link } from "react-router-dom";
import { FaRuler, FaWeight, FaCalendarAlt, FaUserMd } from "react-icons/fa";

const BabyDetails = () => {
    const baby = {
        nickname: "Moon",
        name: "Bùi Diệp Anh",
        dob: "May 09, 2024",
        age: "8 tháng 28 ngày",
        wwWeek: "39 tuần",
        height: "75 cm",
        weight: "12 kg",
        bmi: "21.3",
        avatar: "/default-avatar.png",
        background: "/baby-background.jpg"
    };

    return (
        <div className="w-full flex flex-col items-center text-center px-4">
            {/* Background Cover */}
            <div
                className="w-full h-1/3 bg-cover bg-center flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${baby.background})` }}
            >
                <img
                    src={baby.avatar}
                    alt="Baby Avatar"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <h2 className="text-5xl font-bold text-white mt-4">{baby.nickname}</h2>
            </div>

            {/* Baby Info */}
            <div className="w-full max-w-7xl flex flex-col items-center justify-center py-6">
                <h3 className="text-4xl font-semibold text-gray-900">{baby.name}</h3>
                <p className="text-gray-600 text-lg mt-2">Ngày sinh: {baby.dob}</p>
                <p className="text-gray-600 text-lg">Tuổi: {baby.age}</p>
                <p className="text-gray-600 text-lg">Tuần WW: {baby.wwWeek}</p>
            </div>

            {/* Growth Stats */}
            <div className="grid grid-cols-3 gap-8 w-full max-w-full py-4 px-4">
                <div className="flex flex-col items-center">
                    <FaRuler className="text-blue-500 text-7xl" />
                    <p className="text-3xl font-semibold mt-2">{baby.height}</p>
                    <p className="text-gray-600 text-lg">Chiều cao</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaWeight className="text-green-500 text-7xl" />
                    <p className="text-3xl font-semibold mt-2">{baby.weight}</p>
                    <p className="text-gray-600 text-lg">Cân nặng</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-semibold text-purple-500">{baby.bmi}</p>
                    <p className="text-gray-600 text-lg">BMI</p>
                </div>
            </div>

            {/* Feature Buttons */}
            <h4 className="text-2xl font-medium text-gray-700 mt-8">
                Theo dõi sự phát triển của bé bằng các tính năng
            </h4>
            <div className="grid grid-cols-3 gap-8 w-full max-w-full px-4 mt-6">
                <Link to="/add-baby-info" className="flex flex-col items-center cursor-pointer">
                    <FaRuler className="text-blue-500 text-7xl" />
                    <p className="text-gray-600 text-lg mt-2">Chiều cao, cân nặng</p>
                </Link>
                <Link to="/consultation-request" className="flex flex-col items-center cursor-pointer">
                    <FaUserMd className="text-yellow-500 text-7xl" />
                    <p className="text-gray-600 text-lg mt-2">Consultation Request</p>
                </Link>
                <Link to="/booking-meeting" className="flex flex-col items-center cursor-pointer">
                    <FaCalendarAlt className="text-red-500 text-7xl" />
                    <p className="text-gray-600 text-lg mt-2">Book lịch</p>
                </Link>
            </div>
        </div>
    );
};

export default BabyDetails;
