import React from "react";

const BlogCreation = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

            <form className="space-y-4 max-w-2xl">
                <div>
                    <label className="block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        placeholder="Blog Title"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Featured Image
                    </label>
                    <input type="file" className="mt-1" />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Content</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                        rows="6"
                        placeholder="Write your blog content here..."
                    />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default BlogCreation;
