import React, { useState } from 'react';
import { createBlog } from '../../../services/APIServices';

const BlogCreationForm = ({ onPublish }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Chuẩn bị payload cho API, nếu cần gửi file thì có thể dùng FormData
        const blogPayload = {
            title,
            content,
            // Giả sử API nhận URL ảnh hoặc bạn chuyển file sau này
            // Ở đây dùng URL tạm cho demo, bạn có thể tích hợp upload file
            blogImages: featuredImage
                ? [{ url: URL.createObjectURL(featuredImage), publicId: '' }]
                : [],
            // Các trường khác (authorId, categoryId, …) nếu cần
        };

        try {
            const result = await createBlog(blogPayload);
            if (result.success) {
                // Gọi callback để cập nhật danh sách blog
                onPublish(result.data);
                // Reset lại form
                setTitle('');
                setContent('');
                setFeaturedImage(null);
            } else {
                setError(result.message || 'Có lỗi xảy ra khi tạo bài viết.');
            }
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tạo bài viết.');
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-white rounded shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
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
                    <label className="block font-medium text-gray-700">
                        Featured Image
                    </label>
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

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Publishing...' : 'Publish'}
                </button>
            </form>
        </div>
    );
};

export default BlogCreationForm;
