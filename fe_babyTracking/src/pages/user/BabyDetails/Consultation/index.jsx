// src/components/doctor/consultation/ConsultationRequest.jsx
import React, { useState } from "react";
import {
    ClockIcon,
    LightningBoltIcon,
    XCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/outline";
import ConsultationForm from "./ConsultationForm";
import KanbanCard from "./KanbanCard";

export default function ConsultationRequest() {
    // Mock data ban đầu
    const [requests, setRequests] = useState([
        {
            id: 1,
            parentName: "John Doe",
            childName: "Baby Anna",
            question: "My baby has a rash. What should I do?",
            date: "2025-03-05",
            status: "Pending",
        },
        {
            id: 2,
            parentName: "Alice",
            childName: "Baby Max",
            question: "Baby has fever for 2 days. Need help.",
            date: "2025-03-06",
            status: "Processing",
        },
        {
            id: 3,
            parentName: "Bob",
            childName: "Baby Tom",
            question: "Child won't eat properly. Any advice?",
            date: "2025-03-07",
            status: "Closed",
        },
        {
            id: 4,
            parentName: "Jane Smith",
            childName: "Baby Ema",
            question: "Baby has trouble sleeping.",
            date: "2025-03-08",
            status: "Canceled",
        },
    ]);

    // show/hide form
    const [showForm, setShowForm] = useState(false);

    // Handler: khi nhấn "Create" => hiển thị form
    const handleCreate = () => {
        setShowForm(true);
    };

    // Lưu request => push cột "Pending"
    const handleSaveRequest = (newReq) => {
        setRequests([...requests, newReq]);
        setShowForm(false);
    };

    // Cancel => ẩn form
    const handleCancelForm = () => {
        setShowForm(false);
    };

    // Lọc requests theo status
    const pendingRequests = requests.filter((r) => r.status === "Pending");
    const processingRequests = requests.filter((r) => r.status === "Processing");
    const closedOrCanceled = requests.filter(
        (r) => r.status === "Closed" || r.status === "Canceled"
    );

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Consultation Requests</h2>
                {!showForm && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        Create
                    </button>
                )}
            </div>

            {/* Nếu không show form => hiển thị Kanban */}
            {!showForm && (
                <div className="grid grid-cols-3 gap-4">
                    {/* Pending */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <ClockIcon className="h-5 w-5 text-yellow-500" />
                            <h3 className="text-lg font-semibold">Pending</h3>
                        </div>
                        <div className="space-y-2">
                            {pendingRequests.map((req) => (
                                <KanbanCard key={req.id} req={req} />
                            ))}
                        </div>
                    </div>

                    {/* Processing */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <LightningBoltIcon className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-semibold">Processing</h3>
                        </div>
                        <div className="space-y-2">
                            {processingRequests.map((req) => (
                                <KanbanCard key={req.id} req={req} />
                            ))}
                        </div>
                    </div>

                    {/* Closed / Canceled */}
                    <div className="bg-gray-100 p-4 rounded shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                            <h3 className="text-lg font-semibold">Closed / Canceled</h3>
                        </div>
                        <div className="space-y-2">
                            {closedOrCanceled.map((req) => (
                                <KanbanCard key={req.id} req={req} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Nếu showForm => hiển thị form tạo ConsultationRequest */}
            {showForm && (
                <ConsultationForm
                    onSave={handleSaveRequest}
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
}
