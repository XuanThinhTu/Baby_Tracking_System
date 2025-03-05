import React, { useState } from "react";
import DatePicker from "./DatePicker";

export default function BookingPage() {
    const [duration] = useState("15 min");
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Giả sử những ngày này có lịch
    const availableDays = [24, 28, 30, 31];

    // Thời gian trống
    const availableTimes = ["09:00", "09:15", "09:30", "09:45"];

    // Kiểm tra ngày đã chọn có nằm trong availableDays
    const isDayAvailable =
        selectedDay && availableDays.includes(selectedDay.day);

    return (
        <div className="container mx-auto p-6">
            {/* Khối lớn chia làm 2 cột (theo chiều dọc trên mobile, chiều ngang trên md) */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cột trái (thông tin bác sĩ) */}
                <div className="md:w-1/3 bg-white border border-gray-300 p-6 flex flex-col items-center text-center space-y-4 rounded">
                    <img
                        src="https://media.istockphoto.com/id/1340883379/photo/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man.jpg?s=612x612&w=0&k=20&c=_H4VUPBkS0gEj5ZdZzQo-Hw3lMuyofJpB-P9yS92Wyw="
                        alt="Doctor Avatar"
                        className="w-24 h-24 rounded-full shadow"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Dr. Dubby Rosner</h1>
                    <p className="text-sm text-gray-500 italic">Senior Pediatrician</p>

                    <div className="bg-blue-50 w-full p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700">Meeting</h2>
                        <p className="text-gray-600">{duration} session</p>
                    </div>
                </div>

                {/* Cột phải (chọn ngày giờ) */}
                <div className="md:w-2/3 bg-white border border-gray-300 p-6 rounded">
                    <h2 className="text-xl font-semibold mb-4">Select a Date &amp; Time</h2>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Lịch */}
                        <div className="md:w-2/3 w-full">
                            <DatePicker
                                availableDays={availableDays}
                                selectedDay={selectedDay}
                                onSelectDay={(day) => {
                                    setSelectedDay(day);
                                    setSelectedTime(null); // reset giờ khi chọn ngày khác
                                }}
                            />
                        </div>

                        {/* Khung giờ hoặc thông báo, chỉ hiện khi đã chọn ngày */}
                        {selectedDay && (
                            <div className="md:w-1/3 w-full">
                                <h3 className="text-lg font-semibold mb-2">
                                    {selectedDay.year} - {selectedDay.month + 1} - {selectedDay.day}
                                </h3>

                                {isDayAvailable ? (
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
                                ) : (
                                    <div className="text-red-500 mt-4">Không có lịch trống</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
