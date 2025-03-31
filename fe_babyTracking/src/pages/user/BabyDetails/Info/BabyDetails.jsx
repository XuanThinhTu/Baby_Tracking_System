import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRuler,
  FaWeight,
  FaCalendarAlt,
  FaUserMd,
  FaBaby,
  FaChild,
  FaBabyCarriage,
  FaUser,
} from "react-icons/fa";
import { getBabyGrowthData, getBabyInfo } from "../../../../services/APIServices";
import dayjs from "dayjs";

const fallbackIcons = [FaBaby, FaChild, FaBabyCarriage, FaUser];

const BabyDetails = ({ babyId }) => {
  const [baby, setBaby] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);

  // Random icon if no avatar
  const [randomIcon, setRandomIcon] = useState(null);

  // Select a random icon only once when the component mounts
  useEffect(() => {
    const Icon = fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
    setRandomIcon(() => Icon);
  }, []);

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

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const result = await getBabyGrowthData(babyId);
        // Get the latest measurement data (by measured date)
        const latestData = result
          .slice()
          .sort((a, b) => new Date(b.measuredAt) - new Date(a.measuredAt))[0];

        setHeight(latestData?.height);
        setWeight(latestData?.weight);
        setBmi(latestData?.bmi);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [babyId]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "0 months, 0 days";

    const birth = new Date(birthDate);
    const today = new Date();

    // Calculate total days from birth to today
    const diffTime = Math.abs(today - birth);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate months and remaining days
    const months = Math.floor(totalDays / 30); // Assuming 1 month = 30 days for simplicity
    const days = totalDays % 30;

    return `${months} months, ${days} days`;
  };

  const calculateTotalWeeks = (startDate) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    return Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000));
  };

  // Handle avatar or icon display
  const AvatarOrIcon = () => {
    if (baby?.avatar) {
      return (
        <img
          src={baby.avatar}
          alt="Baby Avatar"
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md mx-auto object-cover"
        />
      );
    }
    if (randomIcon) {
      const IconComp = randomIcon;
      return (
        <div className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md mx-auto flex items-center justify-center bg-gray-100">
          <IconComp className="text-6xl text-gray-400" />
        </div>
      );
    }
    return null; // Case when the icon hasn't loaded yet
  };

  return (
    <div
      className="
        container mx-auto px-6 py-10 
        relative isolate 
        bg-gradient-to-tr from-green-50 via-green-100 to-green-200
      "
    >
      {/* Decorative Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="mx-auto aspect-square w-[80rem] rounded-full bg-gradient-to-r from-green-200 via-green-300 to-green-400 opacity-40"
          style={{
            clipPath:
              "polygon(70% 0%, 100% 35%, 100% 100%, 30% 100%, 0% 65%, 0% 0%)",
          }}
        />
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Sidebar Left */}
        <aside className="col-span-4 bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <AvatarOrIcon />
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
              {baby?.name}
            </h2>
            <p className="text-gray-500 text-lg mt-1">
              Date of Birth:{" "}
              {baby?.birthDate
                ? dayjs(baby.birthDate).format("DD/MM/YYYY")
                : "N/A"}
            </p>
            <p className="text-gray-600 text-md">
              Age: {calculateAge(baby?.birthDate)}
            </p>
            <p className="text-gray-600 text-md">
              Weeks: {calculateTotalWeeks(baby?.birthDate)} weeks old
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <section className="col-span-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              Health Metrics
            </h3>

            {/* Baby Growth Stats - Grid Layout */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <FaRuler className="text-blue-500 text-5xl" />
                <p className="text-xl font-semibold mt-2">
                  {height ? `${height} cm` : "N/A"}
                </p>
                <p className="text-gray-500 text-md">Height</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <FaWeight className="text-green-500 text-5xl" />
                <p className="text-xl font-semibold mt-2">
                  {weight ? `${weight} kg` : "N/A"}
                </p>
                <p className="text-gray-500 text-md">Weight</p>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700">BMI</p>
                <p className="text-xl font-semibold">{bmi || "N/A"}</p>
                <p className="text-gray-500 text-md">BMI Index</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-medium text-gray-700">
              Tracking Features
            </h3>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <Link
                to={`/add-baby-info/${babyId}`}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg hover:bg-gray-50"
              >
                <FaRuler className="text-blue-500 text-5xl mb-3" />
                <p className="text-gray-700 text-lg font-medium">
                  Height & Weight
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
                <p className="text-gray-700 text-lg font-medium">Book Appointment</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BabyDetails;