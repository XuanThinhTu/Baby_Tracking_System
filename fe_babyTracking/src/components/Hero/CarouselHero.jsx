import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    "https://static1.squarespace.com/static/64cd675de4f3100609eeaa1d/t/6715a42f133a002dc9f5ad8b/1729471535323/2409_CB_logo_blk%40300ppi.png?format=1500w",
    "https://assets.hardwarezone.com/img/2024/03/werpuff_Girls_Series_Figures_-_Graphic_Image.jpg",
    "https://st4.depositphotos.com/30440304/40067/i/450/depositphotos_400679804-stock-photo-abstract-background-colorful-brush-strokes.jpg",
    "https://file.hstatic.net/200000864063/file/labubu_toy_d622991ff0044c8ebf2419e2fa5fc758_grande.png",
    "https://www.mykingdom.com.vn/cdn/shop/articles/thumbnail_37.png?v=1732184454",
];

function CarouselHero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Chuyển slide mỗi 10 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-screen mx-auto">
            {/* Carousel wrapper */}
            <div className="relative h-80 md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
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
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 bg-black/50 hover:bg-black/70 rounded-full shadow-md"
            >
                <FaChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 bg-black/50 hover:bg-black/70 rounded-full shadow-md"
            >
                <FaChevronRight className="w-6 h-6 text-white" />
            </button>
        </div>
    );
}

export default CarouselHero;
