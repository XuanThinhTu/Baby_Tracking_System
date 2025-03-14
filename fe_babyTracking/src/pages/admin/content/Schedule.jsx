import {
  Avatar,
  Button,
  Card,
  Modal,
  Pagination,
  Space,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import {
  addNewSlotTimes,
  approveWorkShift,
  getAllDoctors,
  getAllSlotTimes,
  getDoctorWorkingShiftSubmitted,
  rejectWorkShift,
} from "../../../services/APIServices";
import dayjs from "dayjs";

function Schedule() {
  const [slots, setSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [workDates, setWorkDates] = useState([]);
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSchedule = workDates?.slice(startIndex, startIndex + pageSize);
  const [slotTimes, setSlotTimes] = useState({ startTime: "", endTime: "" });

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await getAllDoctors();
        setDoctors(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchDoctorWorkingShift = async () => {
      try {
        if (!selectedDoctor) return;

        const result = await getDoctorWorkingShiftSubmitted(selectedDoctor?.id);
        setWorkDates(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorWorkingShift();
  }, [selectedDoctor]);

  const filterSlotsByTime = (startHour, endHour) =>
    slots.filter((slot) => {
      const hour = dayjs(slot.startTime, "HH:mm:ss").hour();
      return hour >= startHour && hour < endHour;
    });

  const sessionData = [
    {
      key: "morning",
      title: "Morning Slot Times",
      slots: filterSlotsByTime(8, 12),
    },
    {
      key: "afternoon",
      title: "Afternoon Slot Times",
      slots: filterSlotsByTime(13, 17),
    },
    {
      key: "evening",
      title: "Evening Slot Times",
      slots: filterSlotsByTime(17, 22),
    },
  ];

  const handleAddSlot = async () => {
    try {
      await addNewSlotTimes(slotTimes.startTime, slotTimes.endTime);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    const shifts = workDates.map((item) => item.id);
    const result = await approveWorkShift(shifts);
    alert("Working schedule approved!");
    setOpenModal(false);
    setSelectedDoctor(null);
  };

  const handleReject = async () => {
    try {
      const shifts = workDates.map((item) => item.id);
      const result = await rejectWorkShift(shifts);
      alert("Working schedule rejected!");
      setOpenModal(false);
      setSelectedDoctor(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{ width: "50%", padding: "20px", borderRight: "2px solid #ddd" }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Button type="primary" onClick={() => setIsOpen(true)}>
            + Add Slot
          </Button>
          {sessionData.map((session) => (
            <Card key={session.key} title={session.title} hoverable>
              {session.slots.length > 0 ? (
                session.slots.map((item, index) => (
                  <p key={index}>
                    ⏰ {dayjs(item.startTime, "HH:mm:ss").format("HH:mm")} -{" "}
                    {dayjs(item.endTime, "HH:mm:ss").format("HH:mm")}
                  </p>
                ))
              ) : (
                <p>No slots available.</p>
              )}
            </Card>
          ))}
        </Space>

        <Modal
          title="Add Working Slot"
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
              disabledHours: () => [
                ...Array(8).keys(),
                ...Array(2).fill(22, 0, 2),
              ],
            })}
          />
        </Modal>
      </div>

      <div style={{ width: "50%", paddingLeft: "20px" }}>
        <h2>Select a Doctor</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 cột
            gap: "20px",
          }}
        >
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              hoverable
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => handleCardClick(doctor)}
            >
              <Avatar src={doctor.image} size={80} />
              <h3>
                {doctor.firstName} {doctor.lastName}
              </h3>
              <p>{doctor.email}</p>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        title="Doctor Working Schedule"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={600}
      >
        {selectedDoctor && (
          <div style={{ textAlign: "center" }}>
            <Avatar src={selectedDoctor.image} size={100} />
            <h2>
              {selectedDoctor.firstName} {selectedDoctor.lastName}
            </h2>
            <p>
              <b>Email:</b> {selectedDoctor.email}
            </p>

            {workDates?.length > 0 ? (
              <div>
                {paginatedSchedule.map((item, index) => (
                  <Card
                    key={index}
                    style={{ marginBottom: "10px", textAlign: "left" }}
                  >
                    <p>
                      <b>Date:</b> {item.date}
                    </p>
                    <p>
                      <b>Time:</b> {item.startTime} - {item.endTime}
                    </p>
                    <p>
                      <b>Status:</b> {item.status}
                    </p>
                  </Card>
                ))}

                {workDates.length > pageSize && (
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={workDates.length}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: "10px", textAlign: "center" }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Button type="primary" danger onClick={handleReject}>
                    Reject
                  </Button>
                  <Button type="primary" onClick={handleApprove}>
                    Approve
                  </Button>
                </div>
              </div>
            ) : (
              <p>No schedule available.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Schedule;
