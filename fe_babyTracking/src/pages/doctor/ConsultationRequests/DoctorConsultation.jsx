// src/pages/doctor/consultation/index.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import DoctorConsultationBoard from "./DoctorConsultationBoard";
import DoctorConsultationDetail from "./DoctorConsultationDetail";

// Giả sử baseUrl từ env
const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Đây là component "chính" cho Consultation:
 * - Lấy danh sách requests => hiển thị Board
 * - Khi bấm 1 request => hiển thị Detail
 */
export default function DoctorConsultation() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // object
    const [loading, setLoading] = useState(true);

    // Lấy danh sách consultation => GET /consultation/all-request (hoặc /pending-request)
    const fetchAllConsultations = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${baseUrl}/consultation/all-request`);
            // Dựa vào schema:
            // {
            //   success: true,
            //   data: { content: [ { id, status, ... } ] }
            // }
            if (res.data.success) {
                setRequests(res.data.data?.content || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllConsultations();
    }, []);

    // Bấm 1 request => setSelectedRequest => sang màn hình Detail
    const handleSelectRequest = (req) => {
        setSelectedRequest(req);
    };

    // Từ Detail bấm "Back" => quay lại Board
    const handleBackToBoard = () => {
        setSelectedRequest(null);
    };

    if (loading) {
        return <p className="p-4">Loading consultations...</p>;
    }

    // Nếu chưa chọn => hiển thị Board
    if (!selectedRequest) {
        return (
            <DoctorConsultationBoard
                requests={requests}
                onSelectRequest={handleSelectRequest}
            />
        );
    }

    // Ngược lại => hiển thị Detail
    return (
        <DoctorConsultationDetail
            requestData={selectedRequest}
            onBack={handleBackToBoard}
        />
    );
}
