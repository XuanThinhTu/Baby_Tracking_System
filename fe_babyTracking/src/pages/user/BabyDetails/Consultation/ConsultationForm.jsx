// src/components/doctor/consultation/ConsultationForm.jsx
import React, { useState } from "react";

export default function ConsultationForm({ onSave, onCancel }) {
    const [parentName, setParentName] = useState("");
    const [childName, setChildName] = useState("");
    const [question, setQuestion] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        if (!parentName || !childName || !question) {
            alert("Please fill all fields!");
            return;
        }
        // Tạo request mock
        const newReq = {
            id: Date.now(), // tạm
            parentName,
            childName,
            question,
            date: date || "2025-03-10", // fallback
            status: "Pending",
        };
        onSave(newReq);
    };

    return (
        <div className="border border-gray-300 rounded p-4 shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">Create Consultation Request</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Parent Name */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                        Parent Name
                    </label>
                    <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Parent name..."
                    />
                </div>

                {/* Child Name */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                        Child Name
                    </label>
                    <input
                        type="text"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Child name..."
                    />
                </div>

                {/* Question */}
                <div className="col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">
                        Question
                    </label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        rows={3}
                        placeholder="What do you want to ask?"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
