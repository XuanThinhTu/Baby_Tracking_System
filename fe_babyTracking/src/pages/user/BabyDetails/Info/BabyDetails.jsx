import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRuler, FaWeight, FaCalendarAlt, FaUserMd } from "react-icons/fa";
import { getAllBabies } from "../../../../services/APIServices";
import dayjs from "dayjs";

const BabyDetails = ({ babyId }) => {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    const fetchListBabies = async () => {
      try {
        const babiesData = await getAllBabies();
        setBabies(babiesData?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListBabies();
  }, []);

  const baby = babies.find((baby) => baby.id === parseInt(babyId));

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const calculateTotalWeeks = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();

    const differenceInMilliseconds = today - start;

    const totalWeeks = Math.floor(
      differenceInMilliseconds / (7 * 24 * 60 * 60 * 1000)
    );

    return totalWeeks;
  };

  return (
    <div className="w-full flex flex-col items-center text-center px-4">
      {/* Background Cover */}
      <div
        className="w-full h-1/3 bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${baby?.background})` }}
      >
        <img
          src={baby?.avatar}
          alt="Baby Avatar"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Baby Info */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center py-6">
        <h3 className="text-4xl font-semibold text-gray-900">{baby?.name}</h3>
        <p className="text-gray-600 text-lg mt-2">
          Ngày sinh: {dayjs(baby?.birthDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-gray-600 text-lg">
          Tuổi: {calculateAge(baby?.birthDate)}
        </p>
        <p className="text-gray-600 text-lg">
          Tuần: {calculateTotalWeeks(baby?.birthDate)} tuần tuổi
        </p>
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-full py-4 px-4">
        <div className="flex flex-col items-center">
          <FaRuler className="text-blue-500 text-7xl" />
          <p className="text-3xl font-semibold mt-2">{baby?.height}</p>
          <p className="text-gray-600 text-lg">Chiều cao</p>
        </div>
        <div className="flex flex-col items-center">
          <FaWeight className="text-green-500 text-7xl" />
          <p className="text-3xl font-semibold mt-2">{baby?.weight}</p>
          <p className="text-gray-600 text-lg">Cân nặng</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-7xl text-gray-600 font-montserrat">BMI</p>
          <p className="text-gray-600 text-lg">BMI: 12.5</p>
        </div>
      </div>

      {/* Feature Buttons */}
      <h4 className="text-2xl font-medium text-gray-700 mt-8">
        Theo dõi sự phát triển của bé bằng các tính năng
      </h4>
      <div className="grid grid-cols-3 gap-8 w-full max-w-full px-4 mt-6">
        <Link
          to={`/add-baby-info/${babyId}`}
          className="flex flex-col items-center cursor-pointer"
        >
          <FaRuler className="text-blue-500 text-7xl" />
          <p className="text-gray-600 text-lg mt-2">Chiều cao, cân nặng</p>
        </Link>
        <Link
          to="/consultation-request"
          className="flex flex-col items-center cursor-pointer"
        >
          <FaUserMd className="text-yellow-500 text-7xl" />
          <p className="text-gray-600 text-lg mt-2">Consultation Request</p>
        </Link>
        <Link
          to="/booking-meeting"
          className="flex flex-col items-center cursor-pointer"
        >
          <FaCalendarAlt className="text-red-500 text-7xl" />
          <p className="text-gray-600 text-lg mt-2">Book lịch</p>
        </Link>
      </div>
    </div>
  );
};

export default BabyDetails;
