import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://static1.squarespace.com/static/64cd675de4f3100609eeaa1d/t/6715a42f133a002dc9f5ad8b/1729471535323/2409_CB_logo_blk%40300ppi.png?format=1500w",
  "https://images.ctfassets.net/6m9bd13t776q/1ZrwJJgadUFW8LOMKTLepe/01766d7715bf1377106a6393004eeecb/BWBW-week-6-3776703.png?fm=webp&q=75&w=780",
  "https://cdn-azure.notinoimg.com/cdn-cgi/image/w=1040,q=80/blog/article/01_8e1a76.jpg",
  "https://t3.ftcdn.net/jpg/00/17/30/74/360_F_17307408_RcdYtwlTOMmQAqqqYLZkJBDgb1SKHOXZ.jpg",
  "https://i1.adis.ws/i/canon/get-inspired-baby-photos-hero-16x9_0ce4f439ed9d42d2aeb0d2d162c9ac32?$media-collection-full-dt-jpg$",
];

function CarouselHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chuyển slide mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Đổi lại thành 10 giây
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-screen h-screen">
      {" "}
      {/* Full màn hình */}
      {/* Carousel wrapper - Full màn hình */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-12 w-12 bg-black/50 hover:bg-black/70 rounded-full shadow-md"
      >
        <FaChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-12 w-12 bg-black/50 hover:bg-black/70 rounded-full shadow-md"
      >
        <FaChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default CarouselHero;
