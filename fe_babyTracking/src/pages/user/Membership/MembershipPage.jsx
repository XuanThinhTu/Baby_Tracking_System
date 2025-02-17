import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const MembershipPackages = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

    return (
        <div className="flex justify-center items-center bg-gray-100 px-4 py-12 md:py-20">
            <div className="max-w-7xl w-full lg:w-11/12 p-10 md:p-14 bg-white rounded-3xl shadow-lg border border-gray-300">


                {/* Title */}
                <div className="text-center">
                    <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                        Our Pricing Plans
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-3">
                        Our pricing is simple with no hidden fees
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        7 Days free trial. No credit card required.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <span className="text-gray-700 font-semibold">Bill Monthly</span>
                    <button
                        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${billingCycle === "yearly" ? "bg-blue-600" : ""
                            }`}
                        onClick={() =>
                            setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
                        }
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${billingCycle === "yearly" ? "translate-x-6" : ""
                                }`}
                        />
                    </button>
                    <span className="text-gray-700">Bill Yearly</span>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Free Plan */}
                    <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-md flex flex-col justify-between">
                        <div>
                            <span className="text-sm bg-white text-indigo-600 px-3 py-1 rounded-full">
                                FREE
                            </span>
                            <h3 className="text-4xl font-bold mt-4">$0</h3>
                            <p className="text-lg mt-2">Per member, per yearly</p>
                            <ul className="mt-4 space-y-3">
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
                        <button className="mt-6 py-3 px-6 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-gray-100 transition">
                            Start for free
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gray-100 p-8 rounded-3xl shadow-md flex flex-col justify-between">
                        <div>
                            <span className="text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
                                PREMIUM
                            </span>
                            <h3 className="text-4xl font-bold text-indigo-600 mt-4">$150</h3>
                            <p className="text-lg text-gray-600 mt-2">Per member, per yearly</p>
                            <ul className="mt-4 space-y-3 text-gray-700">
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
                        <button className="mt-6 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition">
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPackages;
