import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import EditBabyForm from "./EditBabyForm";
import BabyForm from "./AddBabyForm";
import Breadcrumbs from "../../../components/elements/Breadcrumb";

const MyFamily = () => {
    const [babies, setBabies] = useState([
        { id: 1, name: "My child", birthday: "April 8, 2024", gender: "Boy", avatar: "" },
        { id: 2, name: "Tyler Tu", birthday: "March 17, 2024", gender: "Girl", avatar: "" }
    ]);
    const [editingBaby, setEditingBaby] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
    };

    const handleEdit = (baby) => {
        setEditingBaby(baby);
    };

    const handleRemove = (id) => {
        setBabies(babies.filter((b) => b.id !== id));
    };


    const handleSave = (updatedBaby) => {
        updatedBaby.birthday = formatDate(updatedBaby.birthday);
        setBabies(babies.map((b) => (b.id === updatedBaby.id ? updatedBaby : b)));
        setEditingBaby(null);
    };

    const handleAddBaby = (newBaby) => {
        newBaby.birthday = formatDate(newBaby.birthday);
        setBabies([...babies, { ...newBaby, id: babies.length + 1 }]);
        setIsAdding(false);
    };

    return (
        <>
            <Breadcrumbs headline="My Family" />
            <div className="w-full min-h-screen flex flex-col items-center bg-white text-black p-8">
                <h1 className="text-2xl font-bold mb-6">I'm a parent</h1>
                <div className="w-full max-w-3xl bg-gray-100 p-6 rounded-2xl shadow-md">
                    {babies.map((baby) => (
                        <div key={baby.id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <Link to={`/baby-details`} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                                <img
                                    src={baby.avatar || "/default-avatar.png"}
                                    alt={baby.name}
                                    className="w-12 h-12 rounded-full border"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{baby.name}</p>
                                    <p className="text-gray-500">{baby.birthday}</p>
                                </div>
                            </Link>
                            <button onClick={() => handleEdit(baby)} className="p-2 text-blue-500 hover:text-blue-700">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    ))}
                    {/* Add Child Button */}
                    <button
                        className="flex items-center space-x-2 text-blue-500 mt-4 hover:text-blue-700"
                        onClick={() => setIsAdding(true)}
                    >
                        <FaPlus />
                        <span>Add a child</span>
                    </button>
                </div>

                {/* Popup Edit Baby Form */}
                {editingBaby && (
                    <EditBabyForm
                        baby={editingBaby}
                        onClose={() => setEditingBaby(null)}
                        onSave={handleSave}
                    />
                )}

                {/* Popup Add Baby Form */}
                {isAdding && (
                    <BabyForm
                        onClose={() => setIsAdding(false)}
                        onSave={handleAddBaby}
                    />
                )}
            </div>
        </>
    );
};

export default MyFamily;
