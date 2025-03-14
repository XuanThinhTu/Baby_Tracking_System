import { useEffect, useState } from "react";
// Icon Heroicons (cài bằng: npm install @heroicons/react)
import { UserIcon, LogoutIcon } from "@heroicons/react/outline";

// Import các component
import DoctorSidebar from "./DoctorSidebar/DoctorSidebar";
import DoctorProfile from "./DoctorProfile/DoctorProfile";
import BookingManagement from "./BookingManagement/BookingManagement";
import BlogCreation from "./BlogCreation/BlogCreation";
<<<<<<< HEAD
import WorkSchedule from "./WorkSchedule.jsx/WorkSchedule";
import DoctorConsultation from "./ConsultationRequests/DoctorConsultation";
=======
import { getUserInformation } from "../../services/APIServices";
import { useNavigate } from "react-router-dom";
import WorkSchedule from "./WorkSchedule/WorkSchedule";
>>>>>>> d4a4f2165058a39e9c3f900c2fbb5a5aeffb9cbd

export default function DoctorDashboard() {
  // State dropdown header
  const [userInfo, setUserInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigation = useNavigate();

<<<<<<< HEAD
    // Render nội dung main tuỳ theo tab
    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <DoctorProfile />;
            case "consultation":
                return <DoctorConsultation />;
            case "booking":
                return <BookingManagement />;
            case "blog":
                return <BlogCreation />;
            case "workSchedule":
                return <WorkSchedule />;
            default:
                return <DoctorProfile />;
        }
=======
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
      case "workSchedule":
        return <WorkSchedule />;
      default:
        return <DoctorProfile />;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getUserInformation();
        setUserInfo(result.data);
      } catch (error) {
        console.log(error);
      }
>>>>>>> d4a4f2165058a39e9c3f900c2fbb5a5aeffb9cbd
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    setUserInfo(null);
    navigation("/login");
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
            <span>
              Welcome Dr. {userInfo?.firstName} {userInfo?.lastName}
            </span>
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
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                onClick={handleLogout}
              >
                <LogoutIcon className="h-4 w-4 text-gray-500" />
                <span>Logout</span>
              </button>
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
