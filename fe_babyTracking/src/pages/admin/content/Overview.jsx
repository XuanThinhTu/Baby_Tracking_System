import React from "react";
import { Card, Row, Col, Statistic, Table, Button, List, Avatar } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  CalendarOutlined,
  ProfileOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const Overview = () => {
  // Mock data
  const stats = [
    { title: "Total Babies", value: 120, icon: <UserOutlined /> },
    { title: "Total Users", value: 200, icon: <SolutionOutlined /> },
    { title: "Total Doctors", value: 15, icon: <ProfileOutlined /> },
    { title: "Consultations", value: 50, icon: <SolutionOutlined /> },
    { title: "Appointments", value: 80, icon: <CalendarOutlined /> },
    { title: "Health Records", value: 300, icon: <FileTextOutlined /> },
    { title: "Vaccinations", value: 95, icon: <HeartOutlined /> },
  ];

  const recentActivities = [
    {
      key: 1,
      name: "John Doe",
      type: "Growth Record",
      details: "Added weight: 10kg",
    },
    {
      key: 2,
      name: "Jane Smith",
      type: "Appointment",
      details: "Booked with Dr. Lee",
    },
    {
      key: 3,
      name: "Emily Johnson",
      type: "Consultation",
      details: "Requested a checkup",
    },
    {
      key: 4,
      name: "Michael Brown",
      type: "Vaccination",
      details: "Received MMR shot",
    },
    {
      key: 5,
      name: "Sarah Williams",
      type: "Health Record",
      details: "Updated medical history",
    },
  ];

  const columns = [
    { title: "User", dataIndex: "name", key: "name" },
    { title: "Activity Type", dataIndex: "type", key: "type" },
    { title: "Details", dataIndex: "details", key: "details" },
  ];

  const recentMessages = [
    {
      key: 1,
      sender: "Dr. Smith",
      subject: "Appointment Reminder",
      content: "Don't forget your check-up tomorrow!",
    },
    {
      key: 2,
      sender: "Admin",
      subject: "System Update",
      content: "New features have been added to the dashboard.",
    },
    {
      key: 3,
      sender: "Dr. Johnson",
      subject: "Prescription Update",
      content: "Your medication has been adjusted.",
    },
  ];

  const messageColumns = [
    { title: "Sender", dataIndex: "sender", key: "sender" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Message", dataIndex: "content", key: "content" },
  ];

  const topDoctors = [
    { name: "Dr. Smith", specialization: "Pediatrics", patients: 50 },
    { name: "Dr. Johnson", specialization: "Neonatology", patients: 40 },
    { name: "Dr. Brown", specialization: "General Medicine", patients: 35 },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16}>
        {stats.map((stat, index) => (
          <Col span={3} key={index}>
            <Card style={{ height: "100%", cursor: "pointer" }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Recent Activities" style={{ marginTop: 20 }}>
        <Table
          dataSource={recentActivities}
          columns={columns}
          pagination={false}
        />
      </Card>

      <Card title="Recent Messages" style={{ marginTop: 20 }}>
        <Table
          dataSource={recentMessages}
          columns={messageColumns}
          pagination={false}
        />
      </Card>

      <Card title="Top Doctors" style={{ marginTop: 20 }}>
        <List
          itemLayout="horizontal"
          dataSource={topDoctors}
          renderItem={(doctor) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<ProfileOutlined />} />}
                title={doctor.name}
                description={`${doctor.specialization} - ${doctor.patients} Patients`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Overview;
