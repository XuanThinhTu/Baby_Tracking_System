import { useState } from "react";

export default function BookingPage() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState("January 2025");

    const availableDates = [24, 28, 30, 31];
    const availableTimes = ["09:00", "09:15", "09:30", "09:45"];

    return (
        <div className="flex flex-col items-center p-6 w-full">
            {/* Doctor's Name */}
            <h1 className="text-4xl font-bold text-black text-center">Dubby Rosner</h1>

            {/* Doctor's Note */}
            <p className="text-gray-500 text-center mt-2 max-w-lg text-lg">
                Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
            </p>

            {/* Meeting Options */}
            <div className="flex w-full max-w-5xl mt-6 space-x-6">
                {/* Left Column: Options */}
                <div className={`flex flex-col ${selectedOption ? 'w-1/4' : 'w-1/2'} space-y-6`}>
                    <div
                        className="flex items-center cursor-pointer p-6 bg-gray-100 rounded-lg text-xl"
                        onClick={() => setSelectedOption('15 min')}
                    >
                        <span className="w-6 h-6 bg-yellow-500 rounded-full mr-4"></span>
                        <span className="font-semibold text-black">15 Minute Meeting</span>
                    </div>

                    <div
                        className="flex items-center cursor-pointer p-6 bg-gray-100 rounded-lg text-xl"
                        onClick={() => setSelectedOption('30 min')}
                    >
                        <span className="w-6 h-6 bg-blue-500 rounded-full mr-4"></span>
                        <span className="font-semibold text-black">30 Minute Meeting</span>
                    </div>
                </div>

                {/* Right Column: Calendar */}
                {selectedOption && (
                    <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-black mb-4">Select a Date</h2>
                        <div className="flex justify-between items-center text-xl">
                            <button className="text-gray-600">&#9665;</button>
                            <span className="font-bold">{currentMonth}</span>
                            <button className="text-gray-600">&#9655;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-4 text-center mt-4 text-lg">
                            {[...Array(31)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-lg cursor-pointer ${availableDates.includes(i + 1) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                    onClick={() => availableDates.includes(i + 1) && setSelectedDate(i + 1)}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        {selectedDate && (
                            <div className="mt-6 space-y-3">
                                <h3 className="text-xl font-semibold text-black">Available Time Slots</h3>
                                {availableTimes.map(time => (
                                    <div key={time} className="p-4 bg-gray-100 rounded-lg text-lg cursor-pointer hover:bg-gray-200">
                                        {time}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
