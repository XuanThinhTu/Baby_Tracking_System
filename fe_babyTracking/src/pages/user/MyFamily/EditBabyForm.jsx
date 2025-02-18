import React, { useState } from "react";
import { FaCamera, FaTimes, FaCalendarAlt } from "react-icons/fa";

const EditBabyForm = ({ baby, onClose, onSave, onRemove }) => {
    const [updatedBaby, setUpdatedBaby] = useState({ ...baby });
    const [showLossPopup, setShowLossPopup] = useState(false);
    const [showRemovePopup, setShowRemovePopup] = useState(false);
    const [isEditing, setIsEditing] = useState(true);

    // Định dạng ngày sinh theo "March 18, 2004"
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedBaby({ ...updatedBaby, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave({ ...updatedBaby, birthday: formatDate(updatedBaby.birthday) });
    };

    // Đóng tất cả popups và mở lại form chỉnh sửa nếu cần
    const closeAllPopups = () => {
        setShowLossPopup(false);
        setShowRemovePopup(false);
        setIsEditing(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {isEditing && !showLossPopup && !showRemovePopup && (
                <div className="bg-white text-black p-6 rounded-xl shadow-lg w-96 relative">
                    {/* Close Button */}
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <FaTimes size={18} />
                    </button>

                    <h3 className="text-lg font-semibold text-center">My child</h3>
                    <p className="text-sm text-gray-500 text-center">Update your baby's details</p>

                    {/* Avatar Upload */}
                    <div className="flex justify-center my-4">
                        <label className="relative cursor-pointer">
                            {updatedBaby.avatar ? (
                                <img src={updatedBaby.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
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
                            value={updatedBaby.birthday}
                            className="w-full p-2 pl-10 rounded-md bg-gray-100 text-black border border-gray-300 focus:outline-none"
                            onChange={(e) => setUpdatedBaby({ ...updatedBaby, birthday: e.target.value })}
                        />
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    {/* Name Input */}
                    <input
                        type="text"
                        value={updatedBaby.name}
                        placeholder="Baby’s name"
                        className="w-full p-2 mt-3 rounded-md bg-gray-100 text-black border border-gray-300 focus:outline-none"
                        onChange={(e) => setUpdatedBaby({ ...updatedBaby, name: e.target.value })}
                    />

                    {/* Gender Selection */}
                    <p className="mt-3 text-sm text-center">Baby’s sex</p>
                    <div className="flex justify-center space-x-3 mt-2">
                        {["Girl", "Boy", "Don't know"].map((gender) => (
                            <label key={gender} className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={updatedBaby.gender === gender}
                                    onChange={(e) => setUpdatedBaby({ ...updatedBaby, gender: e.target.value })}
                                />
                                <span>{gender}</span>
                            </label>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                    </div>

                    {/* Loss Experience Button */}
                    <p
                        className="mt-4 text-sm text-gray-500 text-center cursor-pointer hover:text-gray-700"
                        onClick={() => {
                            setShowLossPopup(true);
                            setIsEditing(false);
                        }}
                    >
                        I experienced a loss
                    </p>

                    {/* Remove Profile Button */}
                    <p
                        className="mt-2 text-sm text-red-500 text-center cursor-pointer hover:text-red-700"
                        onClick={() => {
                            setShowRemovePopup(true);
                            setIsEditing(false);
                        }}
                    >
                        Remove from profile
                    </p>
                </div>
            )}

            {/* Loss Confirmation Popup */}
            {showLossPopup && (
                <div className="bg-white text-black p-6 rounded-xl shadow-lg w-96 relative">
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeAllPopups}>
                        <FaTimes size={18} />
                    </button>
                    <h3 className="text-lg font-semibold text-center">We're deeply sorry for your loss</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        We'll stop sending you emails and notifications related to this child.
                    </p>

                    <div className="mt-4 space-y-2 text-center">
                        <label className="flex items-center justify-center space-x-2">
                            <input type="radio" name="loss" />
                            <span>Keep child in profile</span>
                        </label>
                        <label className="flex items-center justify-center space-x-2">
                            <input type="radio" name="loss" />
                            <span>Remove child from profile</span>
                        </label>
                    </div>

                    <div className="flex justify-center mt-5">
                        <button onClick={closeAllPopups} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Final Remove Confirmation Popup */}
            {showRemovePopup && (
                <div className="bg-white text-black p-6 rounded-xl shadow-lg w-96 relative">
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeAllPopups}>
                        <FaTimes size={18} />
                    </button>
                    <h3 className="text-lg font-semibold text-center">Remove from profile</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        All information related to this child has been removed from your profile.
                    </p>

                    <div className="flex justify-center mt-5">
                        <button onClick={closeAllPopups} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBabyForm;
