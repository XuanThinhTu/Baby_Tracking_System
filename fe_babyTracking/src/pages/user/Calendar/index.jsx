import { useState } from "react";

export default function BookingPage() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState("January 2025");

    const availableDates = [24, 28, 30, 31];
    const availableTimes = ["09:00", "09:15", "09:30", "09:45"];

    return (
        <div className="flex flex-col items-center p-6 w-full h-screen bg-white">
            {/* Screen 1: Select Meeting Option */}
            {!selectedOption ? (
                <div className="flex flex-col items-center w-full max-w-md">
                    <h1 className="text-4xl font-bold text-black text-center">Dubby Rosner</h1>
                    <p className="text-gray-500 text-center mt-2 max-w-lg text-lg">
                        Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
                    </p>
                    <div className="w-full mt-6">
                        <button
                            className="w-full flex items-center justify-center p-6 bg-gray-100 rounded-lg text-xl font-semibold cursor-pointer"
                            onClick={() => setSelectedOption('15 min')}
                        >
                            <span className="w-6 h-6 bg-yellow-500 rounded-full mr-4"></span>
                            15 Minute Meeting
                        </button>
                    </div>
                </div>
            ) : (
                /* Screen 2: Calendar and Time Selection */
                <div className="flex w-full max-w-5xl mt-6 space-x-6">
                    {/* Left Column: Meeting Details */}
                    <div className="w-1/3 bg-white p-6 flex flex-col border-r shadow-lg">
                        <button className="text-gray-500 mb-4" onClick={() => setSelectedOption(null)}>&#9665; Back</button>
                        <h1 className="text-xl font-semibold text-gray-700">Dubby Rosner</h1>
                        <h2 className="text-3xl font-bold text-black mt-2">15 Minute Meeting</h2>
                        <p className="text-gray-500 mt-2 flex items-center">
                            <span className="mr-2">🕒</span> 15 min
                        </p>
                    </div>

                    {/* Right Column: Calendar and Time Slots */}
                    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-black mb-4">Select a Date & Time</h2>

                        {/* Calendar */}
                        {!selectedDate ? (
                            <div className="p-6">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <button className="text-gray-500">&#9665;</button>
                                    <span className="text-black">{currentMonth}</span>
                                    <button className="text-gray-500">&#9655;</button>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center mt-4">
                                    {[...Array(31)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`p-4 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center ${availableDates.includes(i + 1) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                            onClick={() => availableDates.includes(i + 1) && setSelectedDate(i + 1)}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-black">{`Friday, January ${selectedDate}`}</h3>
                                <div className="mt-4 grid grid-cols-1 gap-2">
                                    {availableTimes.map(time => (
                                        <div
                                            key={time}
                                            className={`p-4 bg-gray-100 rounded-lg text-lg cursor-pointer hover:bg-gray-200 text-center ${selectedTime === time ? 'bg-gray-300' : ''}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                                {selectedTime && (
                                    <div className="mt-6 flex space-x-4 justify-end">
                                        <button className="p-4 bg-gray-700 text-white rounded-lg text-lg w-32">{selectedTime}</button>
                                        <button className="p-4 bg-blue-500 text-white rounded-lg text-lg">Next</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
