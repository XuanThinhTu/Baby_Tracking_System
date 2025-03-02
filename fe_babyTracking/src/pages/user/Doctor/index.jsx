import React from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Ví dụ dùng icon Plus

const doctors = [
    {
        name: "Julian Sims",
        specialty: "Cardiology",
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    },
    {
        name: "Owen Cox",
        specialty: "Cardiology",
        image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    },
    {
        name: "Sia Morgan",
        specialty: "Cardiology",
        image: "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
    },
    {
        name: "Andy Grant",
        specialty: "Cardiology",
        image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    },
    {
        name: "Alice Brown",
        specialty: "Neurology",
        image: "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
    },
    {
        name: "John Doe",
        specialty: "Pediatrics",
        image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    },
];

const DoctorPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Doctors</h1>

            {/* Lưới 6 card: 2 hàng x 3 cột trên màn hình md trở lên */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {doctors.map((doc, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden group relative"
                    >
                        {/* Container cho ảnh, dùng relative + absolute để dễ scale ảnh */}
                        <div className="relative w-full h-80 overflow-hidden">
                            <img
                                src={doc.image}
                                alt={doc.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                            />
                        </div>

                        {/* Thông tin bác sĩ */}
                        <div className="p-4 flex flex-col items-center text-center">
                            <h2 className="text-xl font-semibold">{doc.name}</h2>
                            <p className="text-gray-500">{doc.specialty}</p>
                        </div>

                        {/* Biểu tượng dấu cộng ở góc/bottom (tuỳ ý) */}
                        <button
                            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow group-hover:bg-blue-100 transition-colors"
                            onClick={() => alert(`More info about Dr. ${doc.name}`)}
                        >
                            <AiOutlinePlus className="text-xl text-gray-600" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorPage;
