import { BarChart } from "@mui/x-charts";
import { Flex, Splitter, Typography } from "antd";
import React, { useEffect, useState } from "react";

function BasicBar() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  useEffect(() => {
    console.log(selectedMonth);
  }, [selectedMonth]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const casualData = [15, 18, 12, 20, 25, 30, 22, 28, 24, 27, 29, 35];
  const vipData = [10, 14, 8, 16, 19, 25, 18, 22, 21, 23, 26, 32];
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Splitter
        layout="vertical"
        style={{
          flex: 1,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Splitter.Panel>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: months,
                tickLabelStyle: { textAnchor: "middle", fontSize: 12 },
              },
            ]}
            series={[
              {
                data: casualData,
                label: "Casual Packages",
                color: "#4CAF50",
              },
              {
                data: vipData,
                label: "VIP Packages",
                color: "#FF9800",
              },
            ]}
            width={800}
            height={300}
            onAxisClick={(event, dataIndex) => {
              if (dataIndex !== null) {
                setSelectedMonth(dataIndex);
              }
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          {selectedMonth !== null ? (
            <>
              <Typography.Title
                level={4}
                style={{ textAlign: "center", marginBottom: 10 }}
              >
                {months[selectedMonth.dataIndex]} Data
              </Typography.Title>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Casual Packages", "VIP Packages"],
                    tickLabelStyle: { textAnchor: "middle", fontSize: 14 },
                  },
                ]}
                series={[
                  {
                    data: [casualData[selectedMonth.dataIndex], 0],
                    label: "Casual Packages",
                    color: "#4CAF50",
                  },
                  {
                    data: [0, vipData[selectedMonth.dataIndex]],
                    label: "VIP Packages",
                    color: "#FF9800",
                  },
                ]}
                width={700}
                height={300}
              />
            </>
          ) : (
            <Flex
              justify="center"
              align="center"
              style={{ height: "100%", fontSize: 18, color: "#888" }}
            >
              Click on a month to view details
            </Flex>
          )}
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

export default BasicBar;
