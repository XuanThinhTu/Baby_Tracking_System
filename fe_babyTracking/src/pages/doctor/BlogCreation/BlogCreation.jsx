import React, { useState } from 'react';

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


// Component: Form Tạo Blog (Create)
const BlogCreationForm = ({ onPublish }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);

    const handlePublish = (e) => {
        e.preventDefault();
        // Tạo bài viết mới dựa trên dữ liệu nhập từ form
        const newBlog = {
            id: Date.now(), // Dùng timestamp làm id tạm thời
            title,
            content,
            createdAt: new Date().toISOString(),
            featuredImage: featuredImage ? URL.createObjectURL(featuredImage) : 'https://via.placeholder.com/1200x600',
        };
        onPublish(newBlog);
        // Reset lại form
        setTitle('');
        setContent('');
        setFeaturedImage(null);
    };

    return (
        <div className="p-4 bg-white rounded shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
            <form className="space-y-4" onSubmit={handlePublish}>
                <div>
                    <label className="block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Featured Image</label>
                    <input
                        type="file"
                        className="mt-1"
                        onChange={(e) => setFeaturedImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Content</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        rows="6"
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Publish
                </button>
            </form>
        </div>
    );
};

// Component: Form Chỉnh Sửa Blog (Edit)
const BlogEditForm = ({ blog, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [featuredImage, setFeaturedImage] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedBlog = {
            ...blog,
            title,
            content,
            featuredImage: featuredImage ? URL.createObjectURL(featuredImage) : blog.featuredImage,
            // Nếu cần có updatedAt, có thể thêm ở đây
        };
        onUpdate(updatedBlog);
    };

    return (
        <div className="p-4 bg-white rounded shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                    <label className="block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Featured Image</label>
                    <input
                        type="file"
                        className="mt-1"
                        onChange={(e) => setFeaturedImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Content</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        rows="6"
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Update
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// Component: Quản lý blog của Doctor (Create, Edit, Delete)
const BlogCreation = () => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [editingBlog, setEditingBlog] = useState(null);

    const handlePublish = (newBlog) => {
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
            {/* Form Tạo Blog */}
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
                <BlogEditForm
                    blog={editingBlog}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingBlog(null)}
                />
            )}
        </div>
    );
};

export default BlogCreation;
