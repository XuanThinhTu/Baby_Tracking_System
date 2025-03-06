import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDoctors } from "../../../services/APIServices";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const getDocotorInfo = async () => {
      try {
        const doctors = await getAllDoctors();
        const selectedDoctor = doctors.find(
          (doc) => doc.id === parseInt(doctorId)
        );
        setDoctor(selectedDoctor);
      } catch (error) {
        console.log(error);
      }
    };
    getDocotorInfo();
  }, []);
  console.log(doctor);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Phần hiển thị tổng quan */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Cột trái: Ảnh & Thông tin liên hệ */}
        <div className="md:w-1/3 w-full mb-6 md:mb-0 flex flex-col items-center border p-4 rounded shadow-sm">
          <img
            src="https://via.placeholder.com/150" // Thay bằng link ảnh bác sĩ
            alt="Doctor"
            className="w-36 h-36 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Dr. {doctor?.firstName} {doctor?.lastName}
          </h2>
          <p className="text-gray-600 text-sm mb-2">Cardiology</p>
          <p className="text-gray-600 text-sm mb-1">{doctor?.phone}</p>
          <p className="text-blue-600 text-sm mb-4">{doctor?.email}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>

        {/* Cột phải: Mô tả & Thông tin chi tiết */}
        <div className="md:w-2/3 w-full">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Execrt taion ullamcorper suscipit lobortis nisl ut aliquip ex ea
            commodo. Non habent claritatem insitamcon quat est usus. Eodem modo
            typi qui nunc nobis eleifend option congue nihil imperdiet doming.
            <br />
            <br />
            Lorem ipsum nunc vel risus suscipit nulla rutrum vel in ultrices
            enim. Hendrerit in vulputate velit esse molestie consequat, vel
            illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialty */}
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                Specialty
              </h3>
              <p className="text-gray-700">Cardiology</p>
            </div>

            {/* Degrees */}
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                Degrees
              </h3>
              <p className="text-gray-700">M.D. of Medicine</p>
            </div>

            {/* Training */}
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                Training
              </h3>
              <p className="text-gray-700">
                Graduated from Harvard Medical School, specialized in advanced
                cardiac care.
              </p>
            </div>

            {/* Work Days */}
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                Work Days
              </h3>
              <p className="text-gray-700">Mon - Fri (8:00 - 16:00)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
