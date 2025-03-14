// src/pages/doctor/consultation/ConsultationRequest.jsx
import React, { useState } from "react";
import {
  ClockIcon,
  LightningBoltIcon,
  XCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";

import KanbanCard from "./KanbanCard";
import ConsultationForm from "./ConsultationForm";

export default function ConsultationRequest() {
  const { babyId } = useParams();
  const navigate = useNavigate();
  // Thay vì [] hoặc fetch API, bạn gán sẵn data:
  const [requests, setRequests] = useState([
    {
      id: 1001,
      requestTitle: "My baby has a rash",
      note: "It started yesterday...",
      requestDate: "2025-03-05T10:00:00",
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
    {
      id: 1002,
      requestTitle: "Baby has fever for 2 days",
      note: "High fever, about 39°C",
      requestDate: "2025-03-06T09:30:00",
      doctorId: 102,
      doctorName: "Dr. House",
      status: "Processing",
      child: {
        id: 202,
        name: "Baby Max",
        birthDate: "2024-12-20T00:00:00",
        gender: "boy",
        parentId: 502,
        parentName: "Alice",
      },
    },
    {
      id: 1003,
      requestTitle: "Baby refuses to eat",
      note: "Need advice on nutrition",
      requestDate: "2025-03-07T11:15:00",
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
    {
      id: 1004,
      requestTitle: "Baby trouble sleeping",
      note: "Crying at night",
      requestDate: "2025-03-08T14:20:00",
      doctorId: 103,
      doctorName: "Dr. McCoy",
      status: "Canceled",
      child: {
        id: 204,
        name: "Baby Ema",
        birthDate: "2023-12-20T00:00:00",
        gender: "girl",
        parentId: 504,
        parentName: "Jane Smith",
      },
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  // Tách logic filter status
  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const processingRequests = requests.filter((r) => r.status === "Processing");
  const closedOrCanceled = requests.filter(
    (r) => r.status === "Closed" || r.status === "Canceled"
  );

  const handleCreate = () => {
    setShowForm(true);
  };

  // Thêm request mock => cột Pending
  const handleSaveRequest = (newReq) => {
    setRequests([...requests, newReq]);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  // Bấm card => sang /consultation-detail/:id
  const handleCardClick = (id) => {
    navigate(`/consultation-detail/${id}`);
  };

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

      {/* Kanban hoặc Form */}
      {!showForm ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Pending */}
          <div className="bg-gray-100 p-4 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Pending</h3>
            </div>
            <div className="space-y-2">
              {pendingRequests.map((req) => (
                <div key={req.id} onClick={() => handleCardClick(req.id)}>
                  <KanbanCard req={req} />
                </div>
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
                <div key={req.id} onClick={() => handleCardClick(req.id)}>
                  <KanbanCard req={req} />
                </div>
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
                <div key={req.id} onClick={() => handleCardClick(req.id)}>
                  <KanbanCard req={req} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ConsultationForm
          onSave={handleSaveRequest}
          onCancel={handleCancelForm}
          babyId={babyId}
        />
      )}
    </div>
  );
}
