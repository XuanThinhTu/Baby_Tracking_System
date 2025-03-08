import React, { useState } from "react";
import {
    ClockIcon,
    LightningBoltIcon,
    XCircleIcon,
    PlusCircleIcon,
    UserIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
} from "@heroicons/react/outline";

/* 
  Form hiển thị danh sách request (theo code bạn gửi).
  Ở đây, mình tích hợp sẵn logic "create" mock => 
  Tạo request mới => cột "Pending".
*/
function ConsultationForm({ onSave, onCancel }) {
    // Mock data ví dụ, thay = state + input fields nếu cần
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
            status: "Closed", // or "Canceled"
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

// Component hiển thị card
function KanbanCard({ req }) {
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
