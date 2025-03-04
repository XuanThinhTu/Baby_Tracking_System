import {
  AreaChartOutlined,
  BarChartOutlined,
  CalendarOutlined,
  LaptopOutlined,
  MailOutlined,
  PieChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import UserManagement from "../content/UserManagement";
import DoctorManagement from "../content/DoctorManagement";
import AppointmentManagement from "../content/AppointmentManagement";
import PieChart from "../content/charts/PieChart";
import BarChart from "../content/charts/BarChart";
import Analytics from "../content/Analytics";
import Standard from "../content/Standard";
import Mail from "../content/Mail";
import Overview from "../content/Overview";
import { useNavigate } from "react-router-dom";
import AccountManagement from "../content/AccountManagement";
import { getUserInformation } from "../../../services/APIServices";

const items1 = [
  { key: "home", label: "Home" },
  { key: "users", label: "Users" },
  { key: "charts", label: "Charts" },
  { key: "settings", label: "Settings" },
];

const items2 = [
  {
    key: "dashboard",
    icon: <LaptopOutlined />,
    label: "Dashboard",
    children: [
      { key: "overview", label: "Overview" },
      { key: "analytics", label: "Analytics" },
    ],
  },
  {
    key: "account-management",
    icon: <UserOutlined />,
    label: "Account Management",
    children: [
      { key: "user-management", label: "User Accounts" },
      { key: "doctor-management", label: "Doctor Accounts" },
    ],
  },
  {
    key: "charts",
    icon: <AreaChartOutlined />,
    label: "Charts",
    children: [
      { key: "pie", icon: <PieChartOutlined />, label: "Pie Chart" },
      { key: "bar", icon: <BarChartOutlined />, label: "Bar Chart" },
    ],
  },
  {
    key: "standard",
    icon: <ProfileOutlined />,
    label: "Growth Standard",
  },
  {
    key: "mail",
    icon: <MailOutlined />,
    label: "Mail",
  },
  {
    key: "appointment",
    icon: <CalendarOutlined />,
    label: "Appointment",
  },
];

function AdminHomePage() {
  const [selectedKey, setSelectedKey] = useState("overview");
  const navigator = useNavigate();
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleProfileClick = (e) => {
    if (e.key === "logout") {
      navigator("/login");
    }
  };

  const profileMenu = (
    <Menu
      onClick={handleProfileClick}
      items={[
        { key: "profile", label: "Profile" },
        { key: "logout", label: "Logout" },
      ]}
    />
  );

  const renderContent = () => {
    switch (selectedKey) {
      case "user-management":
        return <UserManagement />;
      case "doctor-management":
        return <DoctorManagement />;
      case "appointment":
        return <AppointmentManagement />;
      case "pie":
        return <PieChart />;
      case "bar":
        return <BarChart />;
      case "analytics":
        return <Analytics />;
      case "standard":
        return <Standard />;
      case "mail":
        return <Mail />;
      case "overview":
        return <Overview />;
      case "users":
        return <AccountManagement />;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;
      try {
        const result = await getUserInformation();
        if (result?.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <Layout style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Header
        style={{ display: "flex", alignItems: "center", background: "white" }}
      >
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={items1}
          style={{ flex: 1 }}
          onClick={({ key }) => setSelectedKey(key)}
        />

        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Space>
            <span>Welcome, {user?.firstName}!</span>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                display: "flex",
              }}
            />
          </Space>
        </Dropdown>
      </Header>

      <Layout style={{ flex: 1 }}>
        <Sider width={200} style={{ height: "100vh", background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["dashboard"]}
            style={{ height: "100%" }}
            items={items2}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>

        <Content
          style={{
            flex: 1,
            padding: "20px",
            background: "#f0f2f5",
            overflow: "auto",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>

      <Footer
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "10px 0",
          marginTop: "20px",
        }}
      >
        Footer
      </Footer>
    </Layout>
  );
}

export default AdminHomePage;
