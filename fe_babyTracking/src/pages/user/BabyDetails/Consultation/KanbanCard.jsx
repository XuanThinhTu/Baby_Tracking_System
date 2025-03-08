// src/components/doctor/consultation/KanbanCard.jsx
import React from "react";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
} from "@heroicons/react/outline";

export default function KanbanCard({ req }) {
    return (
        <div className="bg-white p-3 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold">
                <UserIcon className="h-4 w-4" />
                <span>{req.parentName}</span>
            </div>
            <div className="flex items-center gap-2 mb-1 text-gray-700">
                <UserIcon className="h-4 w-4" />
                <span>Child: {req.childName}</span>
            </div>
            <div className="flex items-center gap-2 mb-1 text-gray-700">
                <QuestionMarkCircleIcon className="h-4 w-4" />
                <span>{req.question}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4" />
                <span>{req.date}</span>
            </div>
        </div>
    );
}
