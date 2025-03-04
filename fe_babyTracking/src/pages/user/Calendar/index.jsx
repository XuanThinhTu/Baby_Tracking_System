import React, { useState } from "react";
import DatePicker from "./DatePicker";

export default function BookingPage() {
    const [duration] = useState("30 min");
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const availableTimes = ["09:00", "09:15", "09:30", "09:45"];

    return (
        <div className="flex w-full h-screen">
            {/* Cột trái (1/3) */}
            <div className="w-1/3 border-r p-6 space-y-4">
                <h1 className="text-2xl font-bold text-black">Dubby Rosner</h1>
                <h2 className="text-xl text-gray-700">Meeting</h2>
                <p className="text-gray-500">{duration}</p>
            </div>

            {/* Cột phải (2/3) */}
            <div className="w-2/3 p-6">
                <h2 className="text-xl font-semibold mb-4">Select a Date &amp; Time</h2>

                <div className="flex h-full">
                    {/* 
            Nếu chưa chọn day => w-full (chiếm 100% cột phải), 
            nếu đã chọn => w-2/3, chừa 1/3 cho khung giờ 
          */}
                    <div className={`${selectedDay ? "w-2/3" : "w-full"} h-full border-r pr-4 flex flex-col`}>
                        <div className="flex-1">
                            <DatePicker
                                availableDays={[24, 28, 30, 31]}
                                onSelectDay={(day) => {
                                    setSelectedDay(day);
                                }}
                            />
                        </div>
                    </div>

                    {/* Khung giờ (1/3) nếu đã chọn day */}
                    {selectedDay && (
                        <div className="w-1/3 pl-4 flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">
                                January {selectedDay}, 2025
                            </h3>

                            <div className="flex flex-col space-y-3">
                                {availableTimes.map((time) => {
                                    const isChosen = selectedTime === time;
                                    if (isChosen) {
                                        return (
                                            <div key={time} className="flex gap-2 w-full">
                                                <button className="flex-1 bg-gray-500 text-white text-center py-2 rounded">
                                                    {time}
                                                </button>
                                                <button className="flex-1 bg-blue-500 text-white text-center py-2 rounded">
                                                    Next
                                                </button>
                                            </div>
                                        );
                                    }
                                    return (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className="border border-blue-500 bg-white text-blue-500 text-center py-2 rounded cursor-pointer hover:bg-blue-50"
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
