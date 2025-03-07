import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "./DatePicker";
// Heroicons
import {
    ArrowLeftIcon,
    ClockIcon,
    CalendarIcon,
    GlobeAltIcon,
    CheckCircleIcon,
    UserIcon,
} from "@heroicons/react/outline";

// Danh sách tên thứ & tháng
const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Hàm tính giờ kết thúc (vd: 09:15 + 15 min => 09:30)
function getEndTime(timeStr, durationStr) {
    // timeStr: "09:15", durationStr: "15 min" => parse "15"
    const [hh, mm] = timeStr.split(":").map(Number);
    const d = parseInt(durationStr);
    const totalMinutes = mm + d;
    const endHh = hh + Math.floor(totalMinutes / 60);
    const endMm = totalMinutes % 60;

    const hhStr = String(endHh).padStart(2, "0");
    const mmStr = String(endMm).padStart(2, "0");
    return `${hhStr}:${mmStr}`;
}

export default function BookingPage() {
    const navigate = useNavigate();
    // step=1: Chọn ngày/giờ, step=2: Note & Confirm, step=3: Success
    const [step, setStep] = useState(1);

    // Thời lượng meeting
    const [duration] = useState("15 min");

    // Dữ liệu user chọn
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [meetingNote, setMeetingNote] = useState("");

    // Giả sử có lịch những ngày này
    const availableDays = [24, 28, 30, 31];
    // Giờ trống
    const availableTimes = ["09:00", "09:15", "09:30", "09:45"];

    // Check ngày có trong availableDays
    const isDayAvailable =
        selectedDay && availableDays.includes(selectedDay.day);

    // Format ngày => "Friday, January 24, 2025"
    const formatSelectedDay = () => {
        if (!selectedDay) return "";
        const dateObj = new Date(
            selectedDay.year,
            selectedDay.month,
            selectedDay.day
        );
        const dayOfWeek = DAY_NAMES[dateObj.getDay()];
        const monthName = MONTH_NAMES[dateObj.getMonth()];
        const dayNumber = dateObj.getDate();
        const yearNumber = dateObj.getFullYear();
        return `${dayOfWeek}, ${monthName} ${dayNumber}, ${yearNumber}`;
    };

    // Nút Back chung (Step 1 => Home? Step 2 => Step 1, Step 3 => ???)
    const handleBack = () => {
        if (step === 1) {
            // Ở Step 1, back về trang Home (hoặc console.log)
            console.log("Back to home or parent page");
        } else if (step === 2) {
            // Step 2 => quay lại Step 1
            setStep(1);
        } else {
            // Step 3 => back to home?
            console.log("Back to home from success screen");
        }
    };

    // Chuyển sang step 2
    const handleNext = () => {
        if (isDayAvailable && selectedTime) {
            setStep(2);
        }
    };

    // Bấm Schedule => step=3
    const handleSchedule = () => {
        setStep(3);
        // TODO: Gọi API, ...
    };

    // Dùng chung: Tính giờ kết thúc
    const endTime = selectedTime ? getEndTime(selectedTime, duration) : "";

    return (
        <div className="container mx-auto p-6">
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Cột trái (1/3) */}
                    <div className="md:w-1/3 bg-white border border-gray-300 p-6 flex flex-col items-center text-center space-y-4 rounded shadow-sm relative">
                        {/* Nút Back icon ở góc trên trái */}
                        <button
                            onClick={handleBack}
                            className="absolute top-3 left-3 text-blue-500 hover:underline flex items-center"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-1" />
                            Back
                        </button>

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

                    {/* Cột phải (2/3) */}
                    <div className="md:w-2/3 bg-white border border-gray-300 p-6 rounded shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Select a Date &amp; Time</h2>

                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Lịch */}
                            <div className={`${selectedDay ? "md:w-2/3" : "w-full"} w-full`}>
                                <DatePicker
                                    availableDays={availableDays}
                                    selectedDay={selectedDay}
                                    onSelectDay={(day) => {
                                        setSelectedDay(day);
                                        setSelectedTime(null); // reset giờ khi chọn ngày
                                    }}
                                />
                            </div>

                            {/* Danh sách giờ (chỉ khi đã chọn day) */}
                            {selectedDay && (
                                <div className="md:w-1/3 w-full">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {formatSelectedDay()}
                                    </h3>

                                    {isDayAvailable ? (
                                        <div className="flex flex-col space-y-3">
                                            {availableTimes.map((time) => {
                                                const isChosen = selectedTime === time;
                                                return isChosen ? (
                                                    <div key={time} className="flex gap-2 w-full">
                                                        <button className="flex-1 bg-gray-500 text-white text-center py-2 rounded">
                                                            {time}
                                                        </button>
                                                        <button
                                                            onClick={handleNext}
                                                            className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                ) : (
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
                                        <div className="text-red-500 mt-4">No available time</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Cột trái (1/3) - Tóm tắt + Back */}
                    <div className="md:w-1/3 bg-white border border-gray-300 p-6 rounded shadow-sm flex flex-col items-center text-center space-y-4 relative">
                        {/* Nút Back icon */}
                        <button
                            onClick={handleBack}
                            className="absolute top-3 left-3 text-blue-500 hover:underline flex items-center"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-1" />
                            Back
                        </button>

                        <h2 className="text-xl font-bold mt-8">{duration} Meeting</h2>

                        {/* Thời gian: 09:15 - 09:30, Friday, January 24, 2025 */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <ClockIcon className="h-5 w-5" />
                            <span>
                                {selectedTime} - {endTime}, {formatSelectedDay()}
                            </span>
                        </div>

                        {/* Timezone */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <GlobeAltIcon className="h-5 w-5" />
                            <span>Indochina Time</span>
                        </div>

                        {(() => {
                            const babyName = "Moon";
                            const babyBirthDate = "2022-06-15";
                            const babyGender = "Female";
                            return (
                                <>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <UserIcon className="h-5 w-5" />
                                        <span>Baby: {babyName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <ClockIcon className="h-5 w-5" />
                                        <span>Birth: {babyBirthDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <UserIcon className="h-5 w-5" />
                                        <span>Gender: {babyGender}</span>
                                    </div>
                                </>
                            );
                        })()}
                    </div>



                    {/* Cột phải (2/3) - Form note */}
                    <div className="md:w-2/3 bg-white border border-gray-300 p-6 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">
                            Please share anything that will help prepare for our meeting
                        </h3>
                        <textarea
                            className="
                w-full border border-gray-300 p-3 rounded mb-4 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                h-40
              "
                            placeholder="Your notes..."
                            value={meetingNote}
                            onChange={(e) => setMeetingNote(e.target.value)}
                        />

                        <button
                            onClick={handleSchedule}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Schedule Event
                        </button>
                    </div>
                </div>
            )}

            {/* ================= STEP 3 (Success) ================= */}
            {step === 3 && (
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                    {/* Icon + Title */}
                    <div className="flex flex-col items-center space-y-2">
                        <CheckCircleIcon className="h-12 w-12 text-green-500" />
                        <h2 className="text-2xl font-bold text-gray-800">You are scheduled</h2>
                        <p className="text-gray-600">
                            A calendar invitation has been sent to your email address.
                        </p>
                    </div>

                    {/* Thông tin meeting */}
                    <div className="bg-white border border-gray-300 rounded shadow-sm p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">{duration} Meeting</h3>

                        {/* Tên bác sĩ */}
                        <div className="flex items-center text-gray-700 mb-2">
                            <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Dubby Rosner</span>
                        </div>

                        {/* Thời gian */}
                        <div className="flex items-center text-gray-700 mb-2">
                            <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span>
                                {selectedTime} - {endTime}, {formatSelectedDay()}
                            </span>
                        </div>

                        {/* Timezone */}
                        <div className="flex items-center text-gray-700">
                            <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Indochina Time</span>
                        </div>
                    </div>

                    {/* Nút Back to Home */}
                    <button
                        onClick={() => navigate(`/doctor/${doc.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        BACK TO HOME
                    </button>
                </div>
            )}
        </div>
    );
}
