// src/pages/doctor/consultation/ConsultationDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Tạo object mockData
const mockData = {
    1001: {
        id: 1001,
        requestTitle: "My baby has a rash",
        note: "It started yesterday, has red spots on arms",
        requestDate: "2025-03-13T11:18:20.548Z",
        doctorId: 101,
        doctorName: "Dr. Strange",
        status: "Pending",
        child: {
            id: 201,
            name: "Baby Anna",
            birthDate: "2024-11-10T00:00:00",
            gender: "girl",
            parentId: 501,
            parentName: "John Doe",
        },
    },
    1002: {
        id: 1002,
        requestTitle: "Baby has fever for 2 days",
        note: "High fever, about 39°C",
        requestDate: "2025-03-14T09:30:00.000Z",
        doctorId: 102,
        doctorName: "Dr. House",
        status: "Processing",
        child: {
            id: 202,
            name: "Baby Max",
            birthDate: "2025-01-02T00:00:00",
            gender: "boy",
            parentId: 502,
            parentName: "Alice",
        },
    },
    1003: {
        id: 1003,
        requestTitle: "Baby refuses to eat",
        note: "Need advice on nutrition",
        requestDate: "2025-03-15T08:45:00.000Z",
        doctorId: 101,
        doctorName: "Dr. Strange",
        status: "Closed",
        child: {
            id: 203,
            name: "Baby Tom",
            birthDate: "2024-05-15T00:00:00",
            gender: "boy",
            parentId: 503,
            parentName: "Bob",
        },
    },
};

export default function ConsultationDetail() {
    const { id } = useParams(); // /consultation-detail/:id

    // State cho consultation (mock)
    const [consultation, setConsultation] = useState(null);

    // State cho forum-like
    const [replies, setReplies] = useState([
        // Mặc định 1-2 reply demo
        { author: "Doctor", content: "Hello, how can I help?" },
        { author: "User", content: "My baby has a fever for 2 days..." },
    ]);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        const numericId = parseInt(id, 10);
        if (mockData[numericId]) {
            setConsultation(mockData[numericId]);
        } else {
            setConsultation(null);
        }
    }, [id]);

    if (!consultation) {
        return <p>Không tìm thấy request!</p>;
    }

    const { requestTitle, note, requestDate, status, child } = consultation;

    // Xử lý “reply” (mock)
    const handleAddReply = () => {
        if (!newReply.trim()) return;
        setReplies([...replies, { author: "User", content: newReply }]);
        setNewReply("");
    };

    return (
        <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-2">{requestTitle || "No Title"}</h2>
            <p className="text-gray-600 mb-4">
                Request Date: {requestDate?.slice(0, 10)}
            </p>
            <p className="text-gray-800 mb-2">Note: {note}</p>
            <p className="text-gray-800 mb-2">Status: {status}</p>

            {/* Thông tin trẻ */}
            {child && (
                <div className="mb-4 p-2 border rounded bg-gray-50">
                    <h4 className="font-semibold">Child Info</h4>
                    <p>Name: {child.name}</p>
                    <p>Birth: {child.birthDate?.slice(0, 10)}</p>
                    <p>Gender: {child.gender}</p>
                    <p>Parent: {child.parentName}</p>
                </div>
            )}

            {/* Forum-like UI */}
            {status === "Processing" ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Discussion</h3>
                    <div className="space-y-2 mb-4">
                        {replies.map((r, idx) => (
                            <div key={idx} className="p-2 border rounded">
                                <strong>{r.author}:</strong> {r.content}
                            </div>
                        ))}
                    </div>
                    {/* Form add reply */}
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border p-2 rounded"
                            placeholder="Type your reply..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                        <button
                            onClick={handleAddReply}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : status === "Closed" || status === "Canceled" ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Discussion (Read-Only)</h3>
                    {replies.map((r, idx) => (
                        <div key={idx} className="p-2 border rounded mb-2">
                            <strong>{r.author}:</strong> {r.content}
                        </div>
                    ))}
                    <p className="text-gray-500">This request is closed.</p>
                </div>
            ) : (
                // status = 'Pending'
                <div className="mt-4">
                    <p className="text-gray-500">This request is still pending.</p>
                </div>
            )}
        </div>
    );
}
