import React from "react";

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex items-start">
        {/* Large Quotation Mark */}
        <div className="mr-6 text-indigo-600 text-[10rem] leading-none font-serif select-none">
          “
        </div>

        {/* Testimonial Content */}
        <div>
          <p className="text-4xl text-gray-800 mb-8 leading-relaxed">
            "Their service has been truly outstanding. I have never felt more
            confident about my child's growth and well-being. The tracking
            features are intuitive, and the insights are incredibly helpful for
            parents.{" "}
            <span className="text-purple-600">Highly recommended!</span>"
          </p>
          <p className="text-2xl font-semibold text-gray-900">Jake Chaps</p>
          <p className="text-xl text-gray-500">Nutritionist</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
