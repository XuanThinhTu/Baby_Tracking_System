import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  bookingMeeting,
  cancelMeeting,
  getAllSlotTimes,
  getApprovedList,
  getBabyInfo,
  getMeetingInfo,
} from "../../../services/APIServices";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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

function getEndTime(timeStr, durationStr) {
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
  const { babyId } = useParams();
  const [baby, setBaby] = useState(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [duration] = useState("30 min");
  const [meetingList, setMeetingList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [meetingNote, setMeetingNote] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);
  const [yearMonth, setYearMonth] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const isDayAvailable =
    selectedDay && availableDays.map(Number).includes(selectedDay.day);
  const [approvedList, setApprovedList] = useState([]);
  const [allSlotTimes, setAllSlotTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatSelectedDay = () => {
    if (!selectedDay) return "";
    const dateObj = new Date(
      selectedDay.year,
      selectedDay.month - 1,
      selectedDay.day
    );
    const dayOfWeek = DAY_NAMES[dateObj.getDay()];
    const monthName = MONTH_NAMES[dateObj.getMonth()];
    const dayNumber = dateObj.getDate();
    const yearNumber = dateObj.getFullYear();
    return `${dayOfWeek}, ${monthName} ${dayNumber}, ${yearNumber}`;
  };

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
    const fetchSlotTimes = async () => {
      try {
        const result = await getAllSlotTimes();
        setAllSlotTimes(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlotTimes();
  }, []);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const result = await getMeetingInfo();
        setMeetingList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookingList();
  }, []);

  useEffect(() => {
    if (!approvedList.length || !allSlotTimes.length) return;

    const groupSlotsByDate = (approvedList, allSlotTimes) => {
      const groupedByDate = {};

      approvedList.forEach(({ date, startTime }) => {
        if (!groupedByDate[date]) groupedByDate[date] = [];

        const matchedSlots = allSlotTimes.filter(
          (slot) => slot.startTime === startTime
        );

        groupedByDate[date].push(...matchedSlots);
      });

      return Object.values(groupedByDate);
    };

    const newAvailableTimes = groupSlotsByDate(approvedList, allSlotTimes);
    setAvailableTimes(newAvailableTimes);
  }, [approvedList, allSlotTimes]);

  useEffect(() => {
    const fetchAprroveList = async () => {
      try {
        const result = await getApprovedList();

        const filteredList = result.filter(
          (item) => item.date?.slice(0, 7) === yearMonth
        );

        setApprovedList(filteredList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAprroveList();
  }, [yearMonth]);

  useEffect(() => {
    const uniqueDays = [
      ...new Set(approvedList.map((item) => item.date.split("-")[2])),
    ];

    setAvailableDays(uniqueDays);
  }, [approvedList]);

  const handleBack = () => {
    if (step === 1) {
      navigate(`/baby-details/${babyId}`);
    } else if (step === 2) {
      // Step 2 => quay lại Step 1
      setStep(1);
    } else {
      // Step 3 => back to home?
      console.log("Back to home from success screen");
    }
  };

  const handleNext = (key) => {
    if (isDayAvailable && selectedTime) {
      setStep(2);
      setSelectedKey(key);
    }
  };

  const handleSchedule = async () => {
    const [date, slotTimeId, index] = selectedKey.split("/");

    setLoading(true);
    try {
      const result = await bookingMeeting(
        babyId,
        date,
        parseInt(slotTimeId),
        meetingNote
      );
      if (result) {
        toast.success("Đã đăng ký lịch thành công!");
        setStep(3);
      } else {
        toast.error("Đăng ký lịch thất bại, hãy thử lại!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCancelMeeting = async (meetingId) => {
    try {
      const result = await cancelMeeting(meetingId);
      if (result) {
        toast.success("Cancel meeting success!");
        handleBack();
      } else {
        toast.error("Cancel meeting failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const endTime = selectedTime ? getEndTime(selectedTime, duration) : "";

  return (
    <div className="container mx-auto p-6">
      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cột trái (1/3) */}
          <div className="md:w-1/3 bg-white border border-gray-300 p-6 flex flex-col items-center text-center space-y-4 rounded shadow-sm relative">
            <button
              onClick={handleBack}
              className="absolute top-3 left-3 text-blue-500 hover:underline flex items-center"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>

            {/* Hiển thị cuộc hẹn mới nhất (nếu có) */}
            {meetingList.length > 0 ? (
              <>
                <div className="w-full mt-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    All Appointments
                  </h2>
                  <ul className="space-y-2">
                    {meetingList
                      .filter((item) => item.status !== "CLOSED")
                      .map((meeting) => (
                        <li
                          key={meeting.id}
                          className="p-3 border rounded flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-semibold">
                                {meeting.date} <br />
                                {meeting.startTime} - {meeting.endTime}
                              </p>
                              <p className="text-xs text-gray-500">
                                {meeting.childName} ({meeting.childGender})
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                meeting.status === "PROCESSING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : meeting.status === "COMPLETED"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {meeting.status}
                            </span>
                          </div>

                          {meeting.status === "PROCESSING" &&
                            meeting.meetingLink && (
                              <div className="mt-2">
                                <a
                                  href={meeting.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  Join Google Meet
                                </a>
                              </div>
                            )}

                          {meeting.status === "PENDING" && (
                            <button
                              onClick={() => handleCancelMeeting(meeting?.id)}
                              className="mt-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic">No upcoming appointments.</p>
            )}
          </div>

          {/* Cột phải (2/3) */}
          <div className="md:w-2/3 bg-white border border-gray-300 p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Select a Date &amp; Time
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <div className={`${selectedDay ? "md:w-2/3" : "w-full"} w-full`}>
                <DatePicker
                  availableDays={availableDays}
                  selectedDay={selectedDay}
                  onSelectDay={(day) => {
                    setSelectedDay({ ...day, month: day.month + 1 });
                    setSelectedTime(null);
                  }}
                  onYearMonthChange={setYearMonth}
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
                      {availableTimes
                        .filter(
                          (_, index) =>
                            parseInt(availableDays[index], 10) ===
                            selectedDay.day
                        )
                        .flat()
                        .map((slot, index) => {
                          const isChosen = selectedTime === slot.startTime;
                          const uniqueKey = `${selectedDay.year}-${String(
                            selectedDay.month
                          ).padStart(2, "0")}-${String(
                            selectedDay.day
                          ).padStart(2, "0")}/${slot.id}/${index}`;
                          return isChosen ? (
                            <div key={uniqueKey} className="flex gap-2 w-full">
                              <button className="flex-1 bg-gray-500 text-white text-center py-2 rounded">
                                {slot.startTime}
                              </button>
                              <button
                                onClick={() => handleNext(uniqueKey)}
                                className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                              >
                                Next
                              </button>
                            </div>
                          ) : (
                            <button
                              key={uniqueKey}
                              onClick={() => setSelectedTime(slot.startTime)}
                              className="border border-blue-500 bg-white text-blue-500 text-center py-2 rounded cursor-pointer hover:bg-blue-50"
                            >
                              {slot.startTime}
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
              return (
                <>
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserIcon className="h-5 w-5" />
                    <span>Baby: {baby?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>Birth: {baby?.birthDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserIcon className="h-5 w-5" />
                    <span>Gender: {baby?.gender}</span>
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
              {loading ? (
                <>
                  <Spin indicator={<LoadingOutlined spin />} />{" "}
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <span>Schedule Event</span>
                </>
              )}
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
            <h2 className="text-2xl font-bold text-gray-800">
              You are scheduled
            </h2>
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

            <div className="flex items-center text-gray-700">
              <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-500" />
              <span>Indochina Time</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/my-family")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            BACK TO HOME
          </button>
        </div>
      )}
    </div>
  );
}
