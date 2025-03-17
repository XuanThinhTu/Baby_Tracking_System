import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mock data
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
  const { id } = useParams();

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
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-red-500 font-semibold">Không tìm thấy request!</p>
      </div>
    );
  }

  const { requestTitle, note, requestDate, status, child } = consultation;

  // Xử lý “reply” (mock)
  const handleAddReply = () => {
    if (!newReply.trim()) return;
    setReplies([...replies, { author: "User", content: newReply }]);
    setNewReply("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Consultation Details
        </h1>
        <p className="text-sm text-gray-500">
          Below is the information regarding this consultation request.
        </p>
        <hr className="mt-4" />
      </div>

      {/* Content layout */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: request info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {requestTitle || "No Title"}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Request Date:</span>{" "}
              {requestDate?.slice(0, 10)}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Status:</span> {status}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Note:</span> {note}
            </p>
          </div>

          {/* Right side: child info */}
          <div className="bg-gray-50 border border-gray-200 rounded p-4">
            <h4 className="text-lg font-semibold mb-3 text-gray-700">
              Child Information
            </h4>
            {child ? (
              <ul className="space-y-1 text-gray-600">
                <li>
                  <span className="font-medium">Name:</span> {child.name}
                </li>
                <li>
                  <span className="font-medium">Birth:</span>{" "}
                  {child.birthDate?.slice(0, 10)}
                </li>
                <li>
                  <span className="font-medium">Gender:</span> {child.gender}
                </li>
                <li>
                  <span className="font-medium">Parent:</span>{" "}
                  {child.parentName}
                </li>
              </ul>
            ) : (
              <p className="text-gray-500">No child data.</p>
            )}
          </div>
        </div>

        {/* Forum-like UI */}
        {status === "Processing" && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Discussion
            </h3>
            <div className="space-y-3 mb-4">
              {replies.map((r, idx) => {
                // Kiểu “bubble” chat
                const isDoctor = r.author === "Doctor";
                return (
                  <div
                    key={idx}
                    className={`max-w-lg p-3 rounded-md ${
                      isDoctor
                        ? "bg-blue-50 border border-blue-200 self-start"
                        : "bg-green-50 border border-green-200 self-end"
                    }`}
                  >
                    <p className="text-sm text-gray-700">
                      <strong className="block mb-1">{r.author}</strong>
                      {r.content}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Form add reply */}
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 p-2 rounded"
                placeholder="Type your reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <button
                onClick={handleAddReply}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {status === "Closed" || status === "Canceled" ? (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Discussion (Read-Only)
            </h3>
            <div className="space-y-3 mb-2">
              {replies.map((r, idx) => {
                const isDoctor = r.author === "Doctor";
                return (
                  <div
                    key={idx}
                    className={`max-w-lg p-3 rounded-md ${
                      isDoctor
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <p className="text-sm text-gray-700">
                      <strong className="block mb-1">{r.author}</strong>
                      {r.content}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-gray-500">This request is {status}.</p>
          </div>
        ) : null}

        {status === "Pending" && (
          <div className="mt-8">
            <p className="text-gray-500">
              This request is still pending. No discussion available yet.
            </p>
            {/* Button to 'Process'? 
                <button className="mt-4 bg-yellow-500 px-3 py-2 text-white rounded">
                  Start Processing
                </button> 
            */}
          </div>
        )}
      </div>
    </div>
  );
}
