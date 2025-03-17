import React, { useState } from 'react';
import BlogCreationForm from './BlogCreationForm';

// Mock data ban đầu cho danh sách blog của doctor
const initialBlogs = [
    {
        id: 1,
        title: 'Bài viết đầu tiên của Doctor',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: '2025-03-16T17:17:19.212Z',
        featuredImage: 'https://via.placeholder.com/1200x600',
    },
    {
        id: 2,
        title: 'Bài viết thứ hai của Doctor',
        content: 'Quisque vel urna a arcu lacinia vestibulum. Nulla facilisi. Fusce posuere, tortor sed cursus feugiat.',
        createdAt: '2025-03-15T12:00:00.000Z',
        featuredImage: 'https://via.placeholder.com/1200x600',
    },
];

const BlogCreation = () => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [editingBlog, setEditingBlog] = useState(null);

    const handlePublish = (newBlog) => {
        // Thêm blog mới từ API vào đầu danh sách
        setBlogs([newBlog, ...blogs]);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            setBlogs(blogs.filter(blog => blog.id !== id));
        }
    };

    const handleUpdate = (updatedBlog) => {
        setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
        setEditingBlog(null);
    };

    return (
        <div className="p-4">
            {/* Form Tạo Blog sử dụng API */}
            <BlogCreationForm onPublish={handlePublish} />

            {/* Danh sách blog của Doctor */}
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
            <div className="space-y-8">
                {blogs.map(blog => (
                    <div key={blog.id} className="p-4 bg-white rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">{blog.title}</h3>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setEditingBlog(blog)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {blog.featuredImage && (
                            <img src={blog.featuredImage} alt={blog.title} className="w-full h-64 object-cover rounded mb-4" />
                        )}
                        <p className="text-gray-600 text-sm mb-2">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                            {blog.content.substring(0, 200)}...
                        </p>
                    </div>
                ))}
            </div>

            {/* Form Chỉnh Sửa Blog (hiển thị khi có bài cần chỉnh sửa) */}
            {editingBlog && (
                // Tích hợp BlogEditForm tương tự nếu cần
                <div>
                    {/* BlogEditForm component ở đây */}
                </div>
            )}
        </div>
    );
};

export default BlogCreation;
