import React from "react";

const ConsultationRequests = () => {
    // Mock data ví dụ
    const requests = [
        {
            id: 1,
            parentName: "John Doe",
            childName: "Baby Anna",
            question: "My baby has a rash. What should I do?",
            date: "2025-03-05",
        },
        {
            id: 2,
            parentName: "Jane Smith",
            childName: "Baby Max",
            question: "Baby has fever for 2 days. Need help.",
            date: "2025-03-06",
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Consultation Requests</h2>

            <div className="space-y-4">
                {requests.map((req) => (
                    <div key={req.id} className="border border-gray-200 rounded p-4">
                        <div className="font-semibold text-gray-700">
                            Parent: {req.parentName}
                        </div>
                        <div className="text-gray-700">Child: {req.childName}</div>
                        <div className="text-gray-700">Question: {req.question}</div>
                        <div className="text-gray-500 text-sm">Date: {req.date}</div>

                        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            View / Reply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsultationRequests;
