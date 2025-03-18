import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRuler, FaWeight, FaCalendarAlt, FaUserMd } from "react-icons/fa";
import { getBabyInfo } from "../../../../services/APIServices";
import dayjs from "dayjs";

const BabyDetails = ({ babyId }) => {
  const [baby, setBaby] = useState(null);

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
  }, []);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const calculateTotalWeeks = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    return Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-12 gap-10">
        {/* Sidebar Left */}
        <aside className="col-span-4 bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <img
              src={baby?.avatar || "https://via.placeholder.com/150"}
              alt="Baby Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md mx-auto"
            />
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
              {baby?.name}
            </h2>
            <p className="text-gray-500 text-lg mt-1">
              Ngày sinh: {dayjs(baby?.birthDate).format("DD/MM/YYYY")}
            </p>
            <p className="text-gray-600 text-md">
              Tuổi: {calculateAge(baby?.birthDate)} tuổi
            </p>
            <p className="text-gray-600 text-md">
              Tuần: {calculateTotalWeeks(baby?.birthDate)} tuần tuổi
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <section className="col-span-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              Chỉ số sức khỏe
            </h3>

            {/* Baby Growth Stats - Grid Layout */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <FaRuler className="text-blue-500 text-5xl" />
                <p className="text-xl font-semibold mt-2">
                  {baby?.height || "N/A"}
                </p>
                <p className="text-gray-500 text-md">Chiều cao</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <FaWeight className="text-green-500 text-5xl" />
                <p className="text-xl font-semibold mt-2">
                  {baby?.weight || "N/A"}
                </p>
                <p className="text-gray-500 text-md">Cân nặng</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700">BMI</p>
                <p className="text-xl font-semibold">{baby?.bmi || "12.5"}</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-medium text-gray-700">
              Tính năng theo dõi
            </h3>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <Link
                to={`/add-baby-info/${babyId}`}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg hover:bg-gray-50"
              >
                <FaRuler className="text-blue-500 text-5xl mb-3" />
                <p className="text-gray-700 text-lg font-medium">
                  Chiều cao, cân nặng
                </p>
              </Link>

              <Link
                to={`/consultation-request/${babyId}`}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg hover:bg-gray-50"
              >
                <FaUserMd className="text-yellow-500 text-5xl mb-3" />
                <p className="text-gray-700 text-lg font-medium">
                  Consultation Request
                </p>
              </Link>

              <Link
                to={`/booking-meeting/${babyId}`}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg hover:bg-gray-50"
              >
                <FaCalendarAlt className="text-red-500 text-5xl mb-3" />
                <p className="text-gray-700 text-lg font-medium">Book lịch</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BabyDetails;
