import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const MembershipPackages = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

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
                    <p className="text-gray-500 text-xs md:text-sm mt-2">
                        7 Days free trial. No credit card required.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <span className="text-gray-700 text-sm md:text-base font-semibold">Bill Monthly</span>
                    <button
                        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${billingCycle === "yearly" ? "bg-blue-600" : ""
                            }`}
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${billingCycle === "yearly" ? "translate-x-6" : ""
                                }`}
                        />
                    </button>
                    <span className="text-gray-700 text-sm md:text-base">Bill Yearly</span>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

                    {/* Free Plan */}
                    <div className="bg-indigo-600 text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col w-full">

                        {/* Header + Features as Two Columns */}
                        <div className="flex flex-col md:flex-row justify-between items-center w-full">

                            {/* Header Section */}
                            <div className="w-full md:w-1/2 flex flex-col items-start">
                                <span className="text-xs md:text-sm bg-white text-indigo-600 px-3 py-1 rounded-full font-medium">
                                    FREE
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold mt-4">$0</h3>
                                <p className="text-sm md:text-base mt-2">Per member, per yearly</p>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden md:block w-px bg-white h-24 mx-6"></div>

                            {/* Features Section */}
                            <ul className="w-full md:w-1/2 space-y-3 text-sm md:text-base">
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-white text-lg" />
                                    <span>AI advisor for a day</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-white text-lg" />
                                    <span>2 auto tracking</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-white text-lg" />
                                    <span>7 Day transaction clearing</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-white text-lg" />
                                    <span>24/7 Customer support</span>
                                </li>
                            </ul>

                        </div>

                        {/* Button inside Card */}
                        <div className="mt-6">
                            <button className="w-full px-6 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition">
                                Start for free
                            </button>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gray-100 p-8 md:p-10 rounded-3xl shadow-md flex flex-col w-full">

                        {/* Header + Features as Two Columns */}
                        <div className="flex flex-col md:flex-row justify-between items-center w-full">

                            {/* Header Section */}
                            <div className="w-full md:w-1/2 flex flex-col items-start">
                                <span className="text-xs md:text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
                                    PREMIUM
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold text-indigo-600 mt-4">$150</h3>
                                <p className="text-sm md:text-base text-gray-600 mt-2">Per member, per yearly</p>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden md:block w-px bg-gray-300 h-24 mx-6"></div>

                            {/* Features Section */}
                            <ul className="w-full md:w-1/2 space-y-3 text-gray-700 text-sm md:text-base">
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-green-600 text-lg" />
                                    <span>AI advisor for a day</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-green-600 text-lg" />
                                    <span>2 auto tracking</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-green-600 text-lg" />
                                    <span>7 Day transaction clearing</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-green-600 text-lg" />
                                    <span>24/7 Customer support</span>
                                </li>
                            </ul>

                        </div>

                        {/* Button inside Card */}
                        <div className="mt-6">
                            <button className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">
                                Purchase
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MembershipPackages;
