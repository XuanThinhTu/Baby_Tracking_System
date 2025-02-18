import React, { useState } from "react";
import { FaCamera, FaTimes, FaCalendarAlt } from "react-icons/fa";

const BabyForm = ({ onClose, onSave }) => {
    const [newChild, setNewChild] = useState({
        name: "",
        dob: "",
        gender: "",
        avatar: null,
    });

    // Định dạng ngày sinh theo "March 18, 2004"
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
    };

    // Xử lý chọn ảnh
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewChild({ ...newChild, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (newChild.name && newChild.dob) {
            onSave({ ...newChild, dob: formatDate(newChild.dob) });
            onClose(); // Đóng form sau khi lưu
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-96 relative">
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200" onClick={onClose}>
                    <FaTimes size={18} />
                </button>

                <h3 className="text-lg font-semibold">My child</h3>
                <p className="text-sm text-gray-400">A photo helps you personalize your baby's account</p>

                {/* Avatar Upload */}
                <div className="flex justify-center my-4">
                    <label className="relative cursor-pointer">
                        {newChild.avatar ? (
                            <img src={newChild.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                                😊
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
                            <FaCamera size={14} className="text-white" />
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>

                {/* Birthday Input */}
                <div className="relative">
                    <input
                        type="date"
                        className="w-full p-2 pl-10 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
                        onChange={(e) => setNewChild({ ...newChild, dob: e.target.value })}
                    />
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* Name Input */}
                <input
                    type="text"
                    placeholder="Baby’s name"
                    className="w-full p-2 mt-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
                    onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                />

                {/* Gender Selection */}
                <p className="mt-3 text-sm">Baby’s sex</p>
                <div className="flex space-x-3 mt-2">
                    <label className="flex items-center space-x-1">
                        <input
                            type="radio"
                            name="gender"
                            value="Girl"
                            onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
                        />
                        <span>Girl</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input
                            type="radio"
                            name="gender"
                            value="Boy"
                            onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
                        />
                        <span>Boy</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input
                            type="radio"
                            name="gender"
                            value="Don't know"
                            onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
                        />
                        <span>Don't know</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSave}
                    className="mt-5 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Add to my family
                </button>
            </div>
        </div>
    );
};

export default BabyForm;
