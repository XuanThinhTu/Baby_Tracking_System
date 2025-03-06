import React, { useState } from "react";
// Icon Heroicons (cài bằng: npm install @heroicons/react)
import { UserIcon, LogoutIcon } from "@heroicons/react/outline";

// Import các component
import DoctorSidebar from "./DoctorSidebar/DoctorSidebar";
import DoctorProfile from "./DoctorProfile/DoctorProfile";
import ConsultationRequests from "./ConsultationRequests/ConsultationRequests";
import BookingManagement from "./BookingManagement/BookingManagement";
import BlogCreation from "./BlogCreation/BlogCreation";

export default function DoctorDashboard() {
  // State dropdown header
  const [openDropdown, setOpenDropdown] = useState(false);
  // State xác định tab đang hiển thị
  const [activeTab, setActiveTab] = useState("profile");

  // Render nội dung main tuỳ theo tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <DoctorProfile />;
      case "consultation":
        return <ConsultationRequests />;
      case "booking":
        return <BookingManagement />;
      case "blog":
        return <BlogCreation />;
      default:
        return <DoctorProfile />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shadow">
        {/* Tiêu đề bên trái */}
        <div className="text-xl font-bold">Doctor Dashboard</div>

        {/* Dropdown profile góc phải */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded"
          >
            <UserIcon className="h-5 w-5" />
            <span>Dr. John Doe</span>
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded shadow z-10">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setOpenDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Profile
              </button>
              <div className="border-t" />
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <LogoutIcon className="h-4 w-4 text-gray-500" />
                <span>Logout</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* CONTENT: Sidebar + Main */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
