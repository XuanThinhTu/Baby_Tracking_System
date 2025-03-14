import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { verifyUser } from "../../../../services/APIServices";

export default function VerifyAccount() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // Lấy token từ URL
    const token = searchParams.get("token");

    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleActivate = async () => {
        if (!token) {
            toast.error("Không tìm thấy token!");
            return;
        }
        try {
            setStatus("loading");
            const result = await verifyUser(token);
            // result = { success, message, errorCode, userInfo }
            if (result?.success) {
                toast.success("Tài khoản đăng kí thành công!");
                // chuyển sang /login
                navigate("/login");
            } else {
                toast.error(result?.message || "Xác thực thất bại!");
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Có lỗi xảy ra!");
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Xác thực tài khoản
                </h1>
                <p className="text-gray-600 mb-6">
                    Nhấn nút bên dưới để hoàn tất xác thực tài khoản.
                </p>

                {!token ? (
                    <p className="text-red-500">Không có token trong URL!</p>
                ) : (
                    <button
                        onClick={handleActivate}
                        disabled={status === "loading"}
                        className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
                    >
                        {status === "loading" ? "Đang xử lý..." : "Activate account"}
                    </button>
                )}
            </div>
        </div>
    );
}
