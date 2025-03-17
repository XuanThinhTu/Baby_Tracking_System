import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  getMembershipPackages,
  purchaseMembership,
} from "../../../services/membershipServices";

const MembershipPackages = () => {
  const [membershipPackages, setMembershipPackages] = useState([]);

  const fetchMembershipPackages = async () => {
    const response = await getMembershipPackages();
    setMembershipPackages(response.data?.data);
  };

  useEffect(() => {
    fetchMembershipPackages();
  }, []);

  const processUnderline = (text) => {
    return text.replace(/_/g, " ");
  };

  const handleSelectPurchase = async (packageId) => {
    const response = await purchaseMembership(packageId);
    if (response) {
      window.location.href = response.data.data?.paymentUrl;
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 px-4 py-12 md:py-20">
      <div className="max-w-[95%] lg:max-w-[1300px] w-full p-10 md:p-14 bg-white rounded-3xl shadow-lg border border-gray-300">
        {/* Title */}
        <div className="text-center">
          <span className="text-xs md:text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            Our Pricing Plans
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-3">
            Our pricing is simple with no hidden fees
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {membershipPackages.map((item, index) => (
            <div
              className="bg-gray-100 p-8 md:p-10 rounded-3xl shadow-md flex flex-col w-full"
              key={index}
            >
              {/* Header + Features as Two Columns */}
              <div className="flex flex-col md:flex-row justify-between items-center w-full">
                {/* Header Section */}
                <div className="w-full md:w-1/2 flex flex-col items-start">
                  <span className="text-xs md:text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
                    {item.name}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold text-indigo-600 mt-4">
                    ${item.price}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mt-2">
                    Per member, per {item.duration} days
                  </p>
                  <p className="text-sm md:text-base text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px bg-gray-300 h-24 mx-6"></div>

                {/* Features Section */}
                <ul className="w-full md:w-1/2 space-y-3 text-gray-700 text-sm md:text-base">
                  {item.permissions?.map((permission) => (
                    <li
                      className="flex items-center space-x-2"
                      key={permission}
                    >
                      <FaCheckCircle className="text-green-600 text-lg" />
                      <span>{processUnderline(permission)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Button inside Card */}
              <div className="mt-6">
                <button
                  onClick={() => handleSelectPurchase(item.id)}
                  className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPackages;
