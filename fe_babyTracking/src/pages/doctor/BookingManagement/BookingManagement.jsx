import React, { useEffect, useState } from "react";
import { getMeetingInfo } from "../../../services/APIServices";

const bookings = [
  {
    id: 1,
    parentName: "John Doe",
    status: "Pending",
    requestedDate: "2025-03-10 09:00",
  },
  {
    id: 2,
    parentName: "Alice",
    status: "Accepted",
    requestedDate: "2025-03-12 10:30",
  },
];

const BookingManagement = () => {
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const result = await getMeetingInfo();
        setMeetingList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookingList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-2">Parent</th>
            <th className="text-left p-2">Requested Date</th>
            <th className="text-left p-2">Time</th>
            <th className="text-left p-2">Note</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Action</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {meetingList.map((bk) => (
            <tr key={bk.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{bk.parentName}</td>
              <td className="p-2">{bk.date}</td>
              <td className="p-2">
                {bk.startTime} - {bk.endTime}
              </td>
              <td className="p-2">{bk.content}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    bk.status === "Pending" ? "bg-yellow-500" : "bg-green-600"
                  }`}
                >
                  {bk.status}
                </span>
              </td>
              <td className="p-2">
                {bk.status === "PENDING" ? (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Accept
                  </button>
                ) : bk.status === "PROCESSING" ? (
                  <>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Cancel
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
