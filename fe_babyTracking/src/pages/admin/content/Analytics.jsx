import { Card, Menu, Progress, Space } from "antd";
import React, { useState } from "react";

function Analytics() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleCardClick = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  //========================
  const cardData = [
    {
      key: "user",
      title: "User Information",
      stats: [
        {
          label: "Percentage of user accounts completed",
          percent: 90,
          status: "success",
        },
        {
          label: "Percentage of users retained after first month",
          percent: 80,
          status: "active",
        },
      ],
      details: [
        "Total users: 1,500",
        "Active users in last 30 days: 1,350",
        "Active accounts after first month: 1,200",
      ],
    },
    {
      key: "doctor",
      title: "Doctor Information",
      stats: [
        {
          label: "Percentage of responded consultations",
          percent: 65,
          status: "success",
        },
        {
          label: "Percentage of doctors available for booking",
          percent: 80,
          status: "active",
        },
      ],
      details: [
        "Total consultation requests: 100",
        "Responded consultations: 65",
        "Total doctors: 5",
        "Available doctors now: 4",
      ],
    },
    {
      key: "appointments",
      title: "Appointments Information",
      stats: [
        {
          label: "Percentage of completed appointments",
          percent: 70,
          status: "success",
        },
        {
          label: "Percentage of canceled appointments",
          percent: 10,
          status: "exception",
        },
      ],
      details: [
        "Total appointments: 300",
        "Completed appointments: 210",
        "Canceled appointments: 30",
      ],
    },
    {
      key: "child",
      title: "Child Information",
      stats: [
        {
          label: "Percentage of healthy babies based on WHO",
          percent: 70,
          status: "active",
        },
        {
          label: "Percentage of malnourished/overweight children",
          percent: 30,
          status: "exception",
        },
      ],
      details: [
        "Total children registered: 500",
        "Children monitored regularly: 350",
        "Children monitored irregularly: 150",
      ],
    },
  ];
  //========================

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {cardData.map((card) => (
          <div key={card.key} style={{ width: "100%" }}>
            <Card
              title={card.title}
              size="default"
              hoverable={true}
              onClick={() => handleCardClick(card.key)}
              style={{ cursor: "pointer" }}
            >
              {card.stats.map((stat, index) => (
                <div key={index}>
                  <p>{stat.label}</p>
                  <Progress percent={stat.percent} status={stat.status} />
                </div>
              ))}
            </Card>

            {openDropdown === card.key ? (
              <div
                style={{
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Menu>
                  {card.details.map((detail, index) => (
                    <Menu.Item key={index}>{detail}</Menu.Item>
                  ))}
                </Menu>
              </div>
            ) : null}
          </div>
        ))}
      </Space>
    </div>
  );
}

export default Analytics;
