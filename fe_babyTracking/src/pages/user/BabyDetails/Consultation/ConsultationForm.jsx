import Breadcrumbs from "../../../../components/elements/Breadcrumb";
import React, { useState } from "react";

const ConsultationForm = () => {
    // Bỏ các trường babyName, birthDate, gender khỏi state nếu không còn dùng
    const [formData, setFormData] = useState({
        weight: "",
        height: "",
        headCircumference: "",
        fever: "Không",
        symptoms: [],
        rash: "Không",
        diarrhea: "Không",
        medication: "Không",
        medicationDetails: "",
        question: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            symptoms: checked
                ? [...prev.symptoms, value]
                : prev.symptoms.filter((symptom) => symptom !== value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Consultation Request Data:", formData);
        alert("Yêu cầu tư vấn đã được gửi thành công!");
    };

    return (
        <>
            <Breadcrumbs headline="Consultation Request" />
            {/* Header */}
            <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Gửi yêu cầu tư vấn</h2>

            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* 
                      PHẦN "Thông tin bé" đã được xóa bỏ hoàn toàn 
                      (bao gồm tiêu đề và các trường babyName, birthDate, gender)
                    */}



                    {/* Tình trạng sức khỏe */}
                    <div className="col-span-2">
                        <h3 className="text-xl font-semibold text-purple-700 mb-2">Tình trạng sức khỏe</h3>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Bé có bị sốt không?</label>
                        <select
                            name="fever"
                            value={formData.fever}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="Không">Không</option>
                            <option value="Có">Có</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Bé có bị phát ban không?</label>
                        <select
                            name="rash"
                            value={formData.rash}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="Không">Không</option>
                            <option value="Có">Có</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Bé có bị tiêu chảy không?</label>
                        <select
                            name="diarrhea"
                            value={formData.diarrhea}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="Không">Không</option>
                            <option value="Có">Có</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Bé có đang dùng thuốc gì không?
                        </label>
                        <select
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="Không">Không</option>
                            <option value="Có">Có</option>
                        </select>
                        {formData.medication === "Có" && (
                            <input
                                type="text"
                                name="medicationDetails"
                                value={formData.medicationDetails}
                                onChange={handleChange}
                                placeholder="Nhập tên thuốc"
                                className="w-full p-3 border rounded-lg mt-2"
                            />
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Phụ huynh muốn hỏi bác sĩ điều gì?
                        </label>
                        <textarea
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder="Nhập câu hỏi của bạn..."
                            className="w-full p-3 border rounded-lg h-28"
                        />
                    </div>

                    {/* Nút gửi yêu cầu */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-purple-700 text-white py-4 rounded-lg text-xl font-semibold hover:shadow-md transition"
                        >
                            Gửi yêu cầu tư vấn
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ConsultationForm;
