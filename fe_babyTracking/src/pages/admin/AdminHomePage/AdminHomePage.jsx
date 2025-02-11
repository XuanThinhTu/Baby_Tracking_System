import {
  BarChartOutlined,
  CalendarOutlined,
  LaptopOutlined,
  MailOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Avatar, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import UserManagement from "../content/UserManagement";

const items1 = [
  { key: "home", label: "Home" },
  { key: "users", label: "Users" },
  { key: "orders", label: "Orders" },
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
    icon: <BarChartOutlined />,
    label: "Charts",
    children: [
      { key: "pie", label: "Pie Chart" },
      { key: "bar", label: "Bar Chart" },
      { key: "line", label: "Line Chart" },
    ],
  },
  {
    key: "mail",
    icon: <MailOutlined />,
    label: "Mail",
  },
  {
    key: "calendar",
    icon: <CalendarOutlined />,
    label: "Calendar",
  },
];

const profileMenu = (
  <Menu
    items={[
      { key: "profile", label: "Profile" },
      { key: "logout", label: "Logout" },
    ]}
  />
);

function AdminHomePage() {
  const [selectedKey, setSelectedKey] = useState("overview");

  const renderContent = () => {
    switch (selectedKey) {
      case "user-management":
        return <UserManagement />;
    }
  };

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
        />

        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Space>
            <span>Welcome, Admin!</span>
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
            padding: 0,
            minHeight: "100vh",
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>

      <Footer
        style={{ textAlign: "center", background: "#fff", padding: "10px 0" }}
      >
        Footer
      </Footer>
    </Layout>
  );
}

export default AdminHomePage;
