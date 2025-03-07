import React, { useState } from "react";
import { Card, Modal, Button, Checkbox, Row, Col } from "antd";

const fakeDoctors = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    specialty: "Cardiology",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    shifts: [
      {
        date: "2025-03-10",
        time: "morning",
        slots: ["8:00 am - 8:30 am", "8:30 am - 9:00 am"],
      },
      {
        date: "2025-03-12",
        time: "afternoon",
        slots: ["1:00 pm - 1:30 pm", "1:30 pm - 2:00 pm"],
      },
    ],
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Smith",
    specialty: "Pediatrics",
    phone: "987-654-3210",
    email: "emma.smith@example.com",
    shifts: [
      {
        date: "2025-03-11",
        time: "morning",
        slots: ["9:00 am - 9:30 am", "9:30 am - 10:00 am"],
      },
      {
        date: "2025-03-13",
        time: "evening",
        slots: ["5:00 pm - 5:30 pm", "5:30 pm - 6:00 pm"],
      },
    ],
  },
  {
    id: 3,
    firstName: "William",
    lastName: "Brown",
    specialty: "Dermatology",
    phone: "456-789-0123",
    email: "william.brown@example.com",
    shifts: [
      {
        date: "2025-03-14",
        time: "afternoon",
        slots: ["2:00 pm - 2:30 pm", "2:30 pm - 3:00 pm"],
      },
    ],
  },
  {
    id: 4,
    firstName: "Sophia",
    lastName: "Johnson",
    specialty: "Neurology",
    phone: "321-654-0987",
    email: "sophia.johnson@example.com",
    shifts: [
      {
        date: "2025-03-15",
        time: "morning",
        slots: ["8:00 am - 8:30 am", "8:30 am - 9:00 am"],
      },
    ],
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Davis",
    specialty: "Orthopedics",
    phone: "654-321-7890",
    email: "michael.davis@example.com",
    shifts: [
      {
        date: "2025-03-16",
        time: "evening",
        slots: ["6:00 pm - 6:30 pm", "6:30 pm - 7:00 pm"],
      },
    ],
  },
];

const Schedule = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedSlots, setCheckedSlots] = useState({});

  const showModal = (doctor) => {
    setSelectedDoctor(doctor);
    setCheckedSlots({});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDoctor(null);
  };

  const handleSlotChange = (date, time, slot) => {
    const key = `${date}-${time}-${slot}`;
    setCheckedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Selected slots:", checkedSlots);
    setIsModalVisible(false);
  };

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        {fakeDoctors.map((doctor) => (
          <Col key={doctor.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              title={`${doctor.firstName} ${doctor.lastName}`}
              onClick={() => showModal(doctor)}
            >
              <p>
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p>
                <strong>Phone:</strong> {doctor.phone}
              </p>
              <p>
                <strong>Email:</strong> {doctor.email}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={`Doctor: ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {selectedDoctor && (
          <div>
            <p>
              <strong>Specialty:</strong> {selectedDoctor.specialty}
            </p>
            <p>
              <strong>Phone:</strong> {selectedDoctor.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedDoctor.email}
            </p>

            <h3 className="mt-4">Working Shifts</h3>
            {selectedDoctor.shifts.map((shift, index) => (
              <div key={index} className="mb-3 border-b pb-2">
                <p>
                  <strong>Date:</strong> {shift.date}
                </p>
                <p>
                  <strong>Shift:</strong> {shift.time}
                </p>
                <div>
                  {shift.slots.map((slot, slotIndex) => {
                    const key = `${shift.date}-${shift.time}-${slot}`;
                    return (
                      <div
                        key={slotIndex}
                        className="flex justify-between items-center"
                      >
                        <span>{slot}</span>
                        <Checkbox
                          checked={checkedSlots[key] || false}
                          onChange={() =>
                            handleSlotChange(shift.date, shift.time, slot)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Schedule;
