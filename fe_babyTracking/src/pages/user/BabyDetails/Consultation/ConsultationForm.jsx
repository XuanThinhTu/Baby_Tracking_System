// src/pages/doctor/consultation/ConsultationForm.jsx
import React, { useState } from "react";

export default function ConsultationForm({ onSave, onCancel }) {
    const [requestTitle, setRequestTitle] = useState("");
    const [note, setNote] = useState("");
    // v.v. Tùy schema => requestTitle, note, childId...?

    const handleSubmit = () => {
        if (!requestTitle) {
            alert("Title is required!");
            return;
        }
        // Tạo request mock
        const newReq = {
            id: Date.now(),
            requestTitle,
            note,
            requestDate: new Date().toISOString(),
            status: "Pending",
        };
        onSave(newReq);
    };

    return (
        <div className="border border-gray-300 rounded p-4 shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">Create Consultation Request</h2>
            <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                    Request Title
                </label>
                <input
                    type="text"
                    value={requestTitle}
                    onChange={(e) => setRequestTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Title..."
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                    Note
                </label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    rows={3}
                    placeholder="What do you want to ask?"
                />
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
