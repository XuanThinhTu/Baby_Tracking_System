import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data cho danh sách bài viết
const mockBlogs = [
    {
        id: 1,
        title: 'Bài viết đầu tiên',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: '2025-03-16T17:17:19.212Z',
        authorName: 'Tác giả 1',
        blogImages: [
            { id: 1, url: 'https://via.placeholder.com/1200x600', publicId: 'image1' }
        ],
        category: 'Category A',
    },
    {
        id: 2,
        title: 'Bài viết thứ hai',
        content: 'Quisque vel urna a arcu lacinia vestibulum. Nulla facilisi. Fusce posuere, tortor sed cursus feugiat, nunc augue blandit nunc, id blandit felis ligula ut est.',
        createdAt: '2025-03-15T12:00:00.000Z',
        authorName: 'Tác giả 2',
        blogImages: [
            { id: 2, url: 'https://via.placeholder.com/1200x600', publicId: 'image2' }
        ],
        category: 'Category B',
    },
    {
        id: 3,
        title: 'Bài viết thứ ba',
        content: 'Suspendisse potenti. Proin ut dui sed metus pharetra hendrerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl. Aliquam erat volutpat.',
        createdAt: '2025-03-14T08:30:00.000Z',
        authorName: 'Tác giả 3',
        blogImages: [
            { id: 3, url: 'https://via.placeholder.com/1200x600', publicId: 'image3' }
        ],
        category: 'Category A',
    },
];

// Mock data cho Categories (ví dụ)
const categories = ['Category A', 'Category B', 'Category C'];

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc bài viết theo từ khóa (dựa trên tiêu đề)
    const filteredBlogs = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ví dụ: Related Posts hiển thị các bài cùng Category của bài đầu tiên
    const relatedPosts = mockBlogs.filter(blog => blog.category === 'Category A');

    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column (2/3) */}
                <div className="md:w-2/3">
                    {filteredBlogs.map(post => (
                        <div key={post.id} className="mb-12 bg-white rounded shadow overflow-hidden">
                            {post.blogImages && post.blogImages.length > 0 && (
                                <img
                                    src={post.blogImages[0].url}
                                    alt={post.title}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="text-gray-600 text-sm mb-2">
                                    {new Date(post.createdAt).toLocaleDateString()} - {post.authorName}
                                </div>
                                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                                <p className="text-gray-700 mb-4">
                                    {post.content.substring(0, 150)}...
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-block bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column (Sidebar - 1/3) */}
                <div className="md:w-1/3 space-y-8">
                    {/* Search Bar */}
                    <div className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Search</h2>
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {/* Categories List */}
                    <div className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <button className="text-green-800 hover:underline">{category}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Related Posts */}
                    <div className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Related Posts</h2>
                        <ul className="space-y-4">
                            {relatedPosts.map(post => (
                                <li key={post.id} className="flex gap-4">
                                    {post.blogImages && post.blogImages.length > 0 && (
                                        <img
                                            src={post.blogImages[0].url}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <Link to={`/blog/${post.id}`} className="text-green-800 font-semibold hover:underline">
                                            {post.title}
                                        </Link>
                                        <div className="text-gray-600 text-xs">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
