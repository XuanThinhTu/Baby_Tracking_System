import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Flex, Splitter, Table, Typography } from "antd";

export default function BasicPie() {
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
  ];

  const appointmentSource = [
    {
      key: "1",
      name: "Dr Jones",
      number: 10,
    },
    {
      key: "2",
      name: "Dr Smith",
      number: 15,
    },
    {
      key: "3",
      name: "Dr Emily",
      number: 20,
    },
    {
      key: "4",
      name: "Dr William",
      number: 10,
    },
    {
      key: "5",
      name: "Dr Clark",
      number: 15,
    },
  ];

  const agesSource = [
    {
      key: "1",
      name: "0-18",
      number: 30,
    },
    {
      key: "2",
      name: "19-30",
      number: 15,
    },
    {
      key: "3",
      name: "31-45",
      number: 35,
    },
    {
      key: "4",
      name: "46-60",
      number: 60,
    },
    {
      key: "5",
      name: "61-80",
      number: 80,
    },
  ];

  const incomeSource = [
    {
      key: "1",
      name: "Services",
      number: 40,
    },
    {
      key: "2",
      name: "Funding",
      number: 15,
    },
    {
      key: "3",
      name: "Chariry Money",
      number: 10,
    },
  ];

  const Desc = (props) => (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100%",
      }}
    >
      <Typography.Title
        type="secondary"
        level={5}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        Panel {props.text}
      </Typography.Title>
    </Flex>
  );
  return (
    <Splitter
      style={{
        height: "100vh",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Splitter.Panel collapsible>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={5}>Appointment Chart</Typography.Title>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Dr Jones", color: "red" },
                  { id: 1, value: 15, label: "Dr Smith", color: "orange" },
                  { id: 2, value: 20, label: "Dr Emily", color: "pink" },
                  { id: 3, value: 10, label: "Dr William", color: "blue" },
                  { id: 4, value: 15, label: "Dr Clark", color: "green" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Table
            size="large"
            dataSource={appointmentSource}
            columns={columns}
          />
        </Flex>
      </Splitter.Panel>

      <Splitter.Panel collapsible>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={5}>Patient Age Chart</Typography.Title>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 30, label: "0-18" },
                  { id: 1, value: 15, label: "19-30" },
                  { id: 2, value: 35, label: "31-45" },
                  { id: 3, value: 60, label: "46-60" },
                  { id: 4, value: 80, label: "61-80" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Table size="large" dataSource={agesSource} columns={columns} />
        </Flex>
      </Splitter.Panel>

      <Splitter.Panel collapsible={false}>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={5}>Income Chart</Typography.Title>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 40, label: "Services", color: "lightblue" },
                  { id: 1, value: 15, label: "Funding", color: "darkblue" },
                  { id: 2, value: 10, label: "Charity Money", color: "blue" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Table size="large" columns={columns} dataSource={incomeSource} />
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
}
