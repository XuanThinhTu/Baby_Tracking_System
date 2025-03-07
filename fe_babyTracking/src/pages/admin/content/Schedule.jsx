import { Button, Card, Modal, Space, TimePicker } from "antd";
import React, { use, useEffect, useState } from "react";
import {
  addNewSlotTimes,
  getAllSlotTimes,
} from "../../../services/APIServices";
import dayjs from "dayjs";

function Schedule() {
  const [slots, setSlots] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [slotTimes, setSlotTimes] = useState({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchAllSlots = async () => {
      try {
        const result = await getAllSlotTimes();
        setSlots(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSlots();
  }, [slots]);

  const morningSlots = slots.filter((slot) => {
    const hour = dayjs(slot.startTime, "HH:mm:ss").hour();
    return hour >= 8 && hour < 12;
  });

  const afternoonSlots = slots.filter((slot) => {
    const hour = dayjs(slot.startTime, "HH:mm:ss").hour();
    return hour >= 13 && hour < 17;
  });

  const eveningSlots = slots.filter((slot) => {
    const hour = dayjs(slot.startTime, "HH:mm:ss").hour();
    return hour >= 17 && hour < 21;
  });

  const sessionData = [
    { key: "morning", title: "Morning Slot Times", slots: morningSlots },
    { key: "afternoon", title: "Afternoon Slot Times", slots: afternoonSlots },
    { key: "evening", title: "Evening Slot Times", slots: eveningSlots },
  ];

  const handleAddSlot = async () => {
    try {
      const result = await addNewSlotTimes(
        slotTimes.startTime,
        slotTimes.endTime
      );
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          + Add Slot
        </Button>
        {sessionData.map((session) => (
          <div key={session.key} style={{ width: "100%" }}>
            <Card
              title={session.title}
              size="default"
              hoverable={true}
              style={{ cursor: "pointer" }}
            >
              {session.slots.length > 0 ? (
                session.slots.map((item, index) => (
                  <div key={index}>
                    <p>
                      ⏰ {dayjs(item.startTime, "HH:mm:ss").format("HH:mm")} -{" "}
                      {dayjs(item.endTime, "HH:mm:ss").format("HH:mm")}
                    </p>
                    <br />
                  </div>
                ))
              ) : (
                <p>No slots available.</p>
              )}
              <Modal
                title="Add Working slot"
                open={isOpen}
                onOk={handleAddSlot}
                onCancel={() => setIsOpen(false)}
                okText="Add"
                cancelText="Cancel"
              >
                <p>Select working time:</p>
                <TimePicker.RangePicker
                  format="HH:mm"
                  minuteStep={30}
                  onChange={(values) => {
                    if (values) {
                      setSlotTimes({
                        startTime: values[0].format("HH:mm"),
                        endTime: values[1].format("HH:mm"),
                      });
                    }
                  }}
                  disabledTime={() => ({
                    disabledHours: () => {
                      const hours = [];
                      for (let i = 0; i < 8; i++) hours.push(i);
                      for (let i = 21; i < 24; i++) hours.push(i);
                      return hours;
                    },
                  })}
                />
              </Modal>
            </Card>
          </div>
        ))}
      </Space>
    </div>
  );
}

export default Schedule;
