import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/elements/Breadcrumb";

const doctors = [
  {
    id: 1,
    name: "Julian Sims",
    specialty: "Cardiology",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
  },
  {
    id: 2,
    name: "Owen Cox",
    specialty: "Cardiology",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
  {
    id: 3,
    name: "Sia Morgan",
    specialty: "Cardiology",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
  },
  {
    id: 4,
    name: "Andy Grant",
    specialty: "Cardiology",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
  {
    id: 5,
    name: "Alice Brown",
    specialty: "Neurology",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
  },
  {
    id: 6,
    name: "John Doe",
    specialty: "Pediatrics",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
];

const DoctorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs headline="Our Doctors" />
      <div className="w-full py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-md rounded-lg overflow-hidden group relative"
            >
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold">{doc.name}</h2>
                <p className="text-gray-500">{doc.specialty}</p>
              </div>

              <button
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow group-hover:bg-blue-100 transition-colors"
                onClick={() => navigate(`/doctor/${doc.id}`)}
              >
                <AiOutlinePlus className="text-xl text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
