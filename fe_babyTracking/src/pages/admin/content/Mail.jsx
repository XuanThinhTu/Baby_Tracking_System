import { useState } from "react";
import { Layout, List, Avatar, Input, Card, Typography, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

const messagesData = [
  {
    id: 1,
    sender: "John Doe",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Appointment Request",
    message: "Hello, I would like to book an appointment with Dr. Smith.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "Jane Smith",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Consultation Inquiry",
    message: "Can you provide more details about child growth tracking?",
    time: "9:15 AM",
  },
  {
    id: 3,
    sender: "Michael Brown",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Urgent Medical Help",
    message: "My baby has a high fever, need urgent advice.",
    time: "Yesterday",
  },
  {
    id: 4,
    sender: "Sarah Wilson",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Vaccination Schedule",
    message: "I need to know the best time for my baby's next vaccine.",
    time: "Yesterday",
  },
  {
    id: 5,
    sender: "David Johnson",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Follow-up Appointment",
    message: "Can I schedule a follow-up for my child's growth progress?",
    time: "2 days ago",
  },
  {
    id: 6,
    sender: "Emily Davis",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Diet Plan for Toddlers",
    message: "What are the recommended daily nutrients for a 2-year-old?",
    time: "2 days ago",
  },
  {
    id: 7,
    sender: "Chris Martin",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Payment Issues",
    message: "I am having trouble with the payment for the appointment.",
    time: "3 days ago",
  },
  {
    id: 8,
    sender: "Olivia Thompson",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Child's Sleep Pattern",
    message: "My 1-year-old wakes up frequently at night. Is this normal?",
    time: "3 days ago",
  },
  {
    id: 9,
    sender: "William Anderson",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Growth Chart Accuracy",
    message: "How accurate is the growth chart for my child?",
    time: "4 days ago",
  },
  {
    id: 10,
    sender: "Sophia Roberts",
    avatar: "https://joeschmoe.io/api/v1/random",
    subject: "Doctor Availability",
    message: "Are there any pediatricians available for same-day appointments?",
    time: "4 days ago",
  },
];

function Mail() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messagesData.filter((msg) =>
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMessage = (item) => {
    console.log(item);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={300}
        style={{ background: "#fff", padding: "16px", overflowY: "auto" }}
      >
        <Title level={4} style={{ textAlign: "center", marginBottom: "16px" }}>
          Admin Inbox
        </Title>
        <Search
          placeholder="Search messages..."
          allowClear
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <List
          dataSource={filteredMessages}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => setSelectedMessage(item)}
              style={{
                padding: "12px",
                cursor: "pointer",
                background:
                  selectedMessage?.id === item.id ? "#e6f7ff" : "white",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text strong>{item.sender}</Text>}
                description={item.subject}
              />
              <Text type="secondary">{item.time}</Text>
            </List.Item>
          )}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#f0f2f5",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Title level={4}>Message Details</Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          {selectedMessage ? (
            <Card
              title={selectedMessage.subject}
              bordered={false}
              style={{ height: "200px" }}
            >
              <Space direction="vertical">
                <Space>
                  <Avatar src={selectedMessage.avatar} size={48} />
                  <div>
                    <Text strong>{selectedMessage.sender}</Text>
                    <br />
                    <Text type="secondary">{selectedMessage.time}</Text>
                  </div>
                </Space>
                <div>
                  <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    {selectedMessage.message}
                  </Text>
                  <DeleteOutlined
                    onClick={handleDeleteMessage(selectedMessage)}
                    style={{
                      position: "absolute",
                      right: "20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "red",
                    }}
                  />
                </div>
              </Space>
            </Card>
          ) : (
            <Card bordered={false} style={{ textAlign: "center" }}>
              <Text type="secondary">Select a message to view details</Text>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Mail;
