import React from "react";
import babytrackingLogo from "../../assets/images/logo/babyLogo2.png";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Phần trên: Logo, Tên & Brief */}
        <div className="flex flex-col items-center text-center">
          <img src={babytrackingLogo} alt="Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Baby Tracking</h2>
          <p className="mb-6 max-w-md">
            Our Baby Tracking system helps monitor, track, and provide real-time
            information about infant activities, ensuring their safety and
            comprehensive development.
          </p>
        </div>

        {/* Phần giữa: Các liên kết thông tin */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/services" className="hover:underline">
            Services
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Private Policy
          </a>
        </div>

        {/* Phần dưới: Bản quyền */}
        <div className="border-t border-green-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Baby Tracking. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
