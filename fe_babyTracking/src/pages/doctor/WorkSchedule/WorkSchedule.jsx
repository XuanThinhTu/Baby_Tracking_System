import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function WorkSchedule() {
    // Kanban mock data: 3 cột (Draft, Approved, Rejected)
    const [shifts, setShifts] = useState([
        { id: 1, title: "Shift A", status: "Draft" },
        { id: 2, title: "Shift B", status: "Approved" },
        { id: 3, title: "Shift C", status: "Rejected" },
    ]);

    // State form hiển thị/ẩn
    const [showForm, setShowForm] = useState(false);

    // State “status tracker”
    // (Draft, Submit, Confirmed, Approved)
    const [currentStatus, setCurrentStatus] = useState("Draft");

    // Form fields
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [doctorName, setDoctorName] = useState("Dr. Strange");
    const [doctorMail] = useState("dr.strange@example.com"); // cứng
    const [admin, setAdmin] = useState("Alice Admin");
    const [company, setCompany] = useState("BabyTracking Inc.");

    // Lịch table mock: hiển thị 7 ngày
    const [scheduleData, setScheduleData] = useState([
        {
            date: "2025-03-10 (Mon)",
            morning: false,
            afternoon: false,
            evening: false,
            planned: false,
        },
        {
            date: "2025-03-11 (Tue)",
            morning: false,
            afternoon: true,
            evening: false,
            planned: false,
        },
        {
            date: "2025-03-12 (Wed)",
            morning: false,
            afternoon: false,
            evening: false,
            planned: false,
        },
        {
            date: "2025-03-13 (Thu)",
            morning: false,
            afternoon: false,
            evening: false,
            planned: false,
        },
        {
            date: "2025-03-14 (Fri)",
            morning: false,
            afternoon: false,
            evening: false,
            planned: false,
        },
        {
            date: "2025-03-15 (Sat)",
            morning: true,
            afternoon: false,
            evening: true,
            planned: false,
        },
        {
            date: "2025-03-16 (Sun)",
            morning: false,
            afternoon: false,
            evening: false,
            planned: false,
        },
    ]);

    // Xử lý create
    const handleCreate = () => {
        setShowForm(true);
        setCurrentStatus("Draft"); // Khi tạo mới => draft
    };

    // Xử lý save
    const handleSave = () => {
        // Lưu logic => tạm push 1 shift mock => status=Draft
        const newShift = {
            id: shifts.length + 1,
            title: `New Shift`,
            status: "Draft",
        };
        setShifts([...shifts, newShift]);

        // Đổi status => “Draft” (hoặc “Submitted” tùy logic)
        setCurrentStatus("Draft");
        // Ẩn form
        setShowForm(false);
    };

    // Xử lý discard
    const handleDiscard = () => {
        // Không lưu => ẩn form
        setShowForm(false);
    };

    // Xử lý tick box schedule
    const toggleCheck = (index, field) => {
        const newData = [...scheduleData];
        newData[index][field] = !newData[index][field];
        setScheduleData(newData);
    };

    // Xử lý submit => ví dụ setCurrentStatus(“Submit”)
    const handleSubmitSchedule = () => {
        setCurrentStatus("Submit");
        alert("Schedule submitted. Admin will see your request!");
    };

    return (
        <div className="p-4">
            {/* HEADER + CREATE BUTTON */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Work Schedule</h2>
                {!showForm && (
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                )}
            </div>

            {/* Nếu KHÔNG show form => hiển thị Kanban */}
            {!showForm && (
                <div className="grid grid-cols-3 gap-4">
                    {/* DRAFT */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Draft</h3>
                        <div className="space-y-2">
                            {shifts
                                .filter((s) => s.status === "Draft")
                                .map((s) => (
                                    <div key={s.id} className="bg-white p-2 rounded shadow-sm">
                                        {s.title}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* APPROVED */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Approved</h3>
                        <div className="space-y-2">
                            {shifts
                                .filter((s) => s.status === "Approved")
                                .map((s) => (
                                    <div key={s.id} className="bg-white p-2 rounded shadow-sm">
                                        {s.title}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* REJECTED */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Rejected</h3>
                        <div className="space-y-2">
                            {shifts
                                .filter((s) => s.status === "Rejected")
                                .map((s) => (
                                    <div key={s.id} className="bg-white p-2 rounded shadow-sm">
                                        {s.title}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Nếu showForm => hiển thị FORM */}
            {showForm && (
                <div className="space-y-6">
                    {/* STATUS TRACKER */}
                    <StatusTracker currentStatus={currentStatus} />

                    {/* FORM chia 2 phần */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* 1/2 trái */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Từ ngày
                                </label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Tới ngày
                                </label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Các ca làm đã đăng kí trong tháng
                                </label>
                                <div className="bg-gray-50 p-3 rounded text-gray-600">
                                    20 buổi
                                </div>
                            </div>
                        </div>

                        {/* 1/2 phải */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Tên bác sĩ
                                </label>
                                <div className="bg-gray-50 p-3 rounded text-gray-600">
                                    Dr. Strange
                                </div>
                                <p className="text-sm text-gray-500">
                                    {doctorMail}
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Admin
                                </label>
                                <div className="bg-gray-50 p-3 rounded text-gray-600">
                                    Tu X. Thinh
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Company
                                </label>
                                <div className="bg-gray-50 p-3 rounded text-gray-600">
                                    BabyTracking Inc.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLE LỊCH CA LÀM */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Lịch đăng ký ca</h4>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Ca Sáng</th>
                                    <th className="p-2">Ca Chiều</th>
                                    <th className="p-2">Ca Tối</th>
                                    <th className="p-2">Planned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="p-2">{row.date}</td>
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={row.morning}
                                                onChange={() => toggleCheck(idx, "morning")}
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={row.afternoon}
                                                onChange={() => toggleCheck(idx, "afternoon")}
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={row.evening}
                                                onChange={() => toggleCheck(idx, "evening")}
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={row.planned}
                                                onChange={() => toggleCheck(idx, "planned")}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Nút SUBMIT */}
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleSubmitSchedule}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Nút Save / Discard */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleDiscard}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* 
   Component StatusTracker: hiển thị 4 status: 
   Draft, Submit, Confirmed, Approved
   Phần nào trùng currentStatus => highlight
*/
function StatusTracker({ currentStatus }) {
    // Thứ tự steps
    const steps = ["Draft", "Submit", "Confirmed", "Approved"];

    return (
        <div className="flex items-center gap-4 mb-4">
            {steps.map((st, idx) => {
                const isActive = st === currentStatus;
                return (
                    <div key={st} className="flex items-center">
                        {isActive ? (
                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                        )}
                        <span
                            className={`ml-2 font-medium ${isActive ? "text-blue-600" : "text-gray-500"
                                }`}
                        >
                            {st}
                        </span>
                        {idx < steps.length - 1 && (
                            <div className="mx-2 w-8 h-1 bg-gray-300" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
