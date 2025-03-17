// src/pages/doctor/consultation/KanbanCard.jsx
import React from "react";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
} from "@heroicons/react/outline";

export default function KanbanCard({ req }) {
    // Mặc định hiển thị 1 số thông tin. 
    // Tùy schema: 
    // req.id, req.requestTitle, req.status, ...
    // Thử hiển thị requestTitle, date, ...
    return (
        <div className="bg-white p-3 rounded shadow-sm cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold">
                <UserIcon className="h-4 w-4" />
                <span>{req.email || "No Email"}</span>
            </div>
            <div className="flex items-center gap-2 mb-1 text-gray-700">
                <QuestionMarkCircleIcon className="h-4 w-4" />
                <span>{req.requestTitle || "(No Title)"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4" />
                <span>{req.requestDate?.slice(0, 10) || "No date"}</span>
            </div>
        </div>
    );
}
