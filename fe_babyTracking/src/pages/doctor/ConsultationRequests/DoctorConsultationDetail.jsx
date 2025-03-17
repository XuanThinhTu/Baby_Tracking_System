// src/pages/doctor/consultation/DoctorConsultationDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Hiển thị chi tiết 1 Consultation + Discussion
 * @param {object} requestData - object {id, status, requestTitle, note, ...}
 * @param {function} onBack - hàm quay lại board
 */
export default function DoctorConsultationDetail({ requestData, onBack }) {
    const [consultationDetail, setConsultationDetail] = useState(requestData);
    // Dùng requestData làm default, sau fetch => update
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [closeReason, setCloseReason] = useState("");

    // Fetch detail (nếu cần) => GET /consultation/{id}
    // or ta dùng sẵn requestData
    // Fetch replies => GET /consultation-response/{id}
    useEffect(() => {
        if (!requestData) return;
        fetchReplies(requestData.id);
    }, [requestData]);

    const fetchReplies = async (consultationId) => {
        try {
            const res = await axios.get(`${baseUrl}/consultation-response/${consultationId}`);
            if (res.data.success) {
                setReplies(res.data.data?.content || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Thêm reply => POST /consultation-response/{consultationId}
    const handleAddReply = async () => {
        if (!newReply.trim()) return;
        try {
            const body = { content: newReply };
            const res = await axios.post(
                `${baseUrl}/consultation-response/${requestData.id}`,
                body
            );
            if (res.data.success) {
                setReplies((prev) => [...prev, res.data.data]);
                setNewReply("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Doctor: Approve => PATCH /consultation/{id}?status=Processing (VD)
    const handleApprove = async () => {
        try {
            await axios.patch(`${baseUrl}/consultation/${requestData.id}`, null, {
                params: { status: "Processing" },
            });
            // Cập nhật local
            setConsultationDetail((prev) => ({ ...prev, status: "Processing" }));
        } catch (error) {
            console.error(error);
        }
    };

    // Doctor: Close => PATCH /consultation/{id}?status=Closed&reason=...
    const handleClose = async () => {
        if (!closeReason.trim()) {
            alert("Please provide a reason for closing.");
            return;
        }
        try {
            await axios.patch(`${baseUrl}/consultation/${requestData.id}`, null, {
                params: { status: "Closed", reason: closeReason },
            });
            // update local
            setConsultationDetail((prev) => ({ ...prev, status: "Closed" }));
        } catch (error) {
            console.error(error);
        }
    };

    // Doctor: Cancel => PATCH /consultation/{id}?status=Canceled&reason=...
    const handleCancel = async () => {
        if (!closeReason.trim()) {
            alert("Please provide a reason for canceling.");
            return;
        }
        try {
            await axios.patch(`${baseUrl}/consultation/${requestData.id}`, null, {
                params: { status: "Canceled", reason: closeReason },
            });
            setConsultationDetail((prev) => ({ ...prev, status: "Canceled" }));
        } catch (error) {
            console.error(error);
        }
    };

    if (!consultationDetail) {
        return (
            <div className="p-4">
                <p className="text-red-500">No consultation data!</p>
                <button onClick={onBack} className="underline text-blue-500">
                    Back
                </button>
            </div>
        );
    }

    const { id, requestTitle, note, requestDate, status, child } = consultationDetail;

    return (
        <div className="p-4 bg-white rounded shadow-sm">
            <button
                onClick={onBack}
                className="mb-4 text-blue-500 underline hover:text-blue-700"
            >
                &larr; Back
            </button>

            <h2 className="text-2xl font-bold mb-2">{requestTitle || "No Title"}</h2>
            <p className="text-gray-600 mb-2">
                Request Date: {requestDate?.slice(0, 10)}
            </p>
            <p className="text-gray-800 mb-2">Status: {status}</p>
            <p className="text-gray-800 mb-4">Note: {note}</p>

            {child && (
                <div className="mb-4 p-2 border rounded bg-gray-50">
                    <h4 className="font-semibold">Child Info</h4>
                    <p>Name: {child.name}</p>
                    <p>Birth: {child.birthDate?.slice(0, 10)}</p>
                    <p>Gender: {child.gender}</p>
                    <p>Parent: {child.parentName}</p>
                </div>
            )}

            {/* 
        Bác sĩ => Pending => "Approve" => status=Processing 
                  => or "Close"/"Cancel" => status=Closed/Canceled 
      */}
            {status === "Pending" && (
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={handleApprove}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                        Approve (Processing)
                    </button>
                    {/* Input reason, close/cancel */}
                    <input
                        className="border rounded px-2"
                        placeholder="Reason..."
                        value={closeReason}
                        onChange={(e) => setCloseReason(e.target.value)}
                    />
                    <button
                        onClick={handleClose}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-red-300 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Discussion */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Discussion</h3>
                <div className="space-y-2 mb-4">
                    {replies.map((r) => {
                        const authorName = r.user
                            ? `${r.user.firstName} ${r.user.lastName}`
                            : "Unknown";
                        return (
                            <div key={r.id} className="p-2 border rounded">
                                <strong>{authorName}</strong> ({r.user?.role}): {r.content}
                                <p className="text-xs text-gray-400">{r.createdAt?.slice(0, 16)}</p>
                            </div>
                        );
                    })}
                </div>
                {/* Chỉ cho reply nếu status=Processing */}
                {status === "Processing" && (
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
                )}
                {(status === "Closed" || status === "Canceled") && (
                    <p className="text-gray-500 mt-2">
                        This request is {status}. Read-only.
                    </p>
                )}
            </div>
        </div>
    );
}
