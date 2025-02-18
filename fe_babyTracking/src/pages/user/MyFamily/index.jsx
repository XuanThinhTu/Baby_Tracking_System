import React, { useState } from "react";
import { FaBirthdayCake, FaPencilAlt, FaPlusCircle } from "react-icons/fa";
import BabyForm from "./BabyForm"; // Import form

const MyFamily = () => {
    const [children, setChildren] = useState([
        { id: 1, name: "My child", dob: "April 8, 2024", avatar: null },
        { id: 2, name: "Tyler Tu", dob: "March 17, 2024", avatar: null },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addChild = (newChild) => {
        setChildren([...children, { id: children.length + 1, ...newChild }]);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">I'm a parent</h2>

            <div className="space-y-4">
                {children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-4">
                            {child.avatar ? (
                                <img src={child.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 bg-green-200 flex items-center justify-center rounded-full text-xl">
                                    😊
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-900">{child.name}</p>
                                <p className="text-sm text-gray-500 flex items-center space-x-2">
                                    <FaBirthdayCake className="text-gray-400" />
                                    <span>{child.dob}</span>
                                </p>
                            </div>
                        </div>
                        <FaPencilAlt className="text-blue-600 cursor-pointer" />
                    </div>
                ))}

                {/* Add Child Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center space-x-3 text-blue-600 border border-blue-400 rounded-lg px-4 py-3 hover:bg-blue-100 transition"
                >
                    <FaPlusCircle />
                    <span>Add a child</span>
                </button>
            </div>

            {/* Popup Modal */}
            {isModalOpen && <BabyForm onClose={() => setIsModalOpen(false)} onSave={addChild} />}
        </div>
    );
};

export default MyFamily;
