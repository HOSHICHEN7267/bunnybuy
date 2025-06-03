import { useState, useEffect } from "react";
import header_headphone_image from "../assets/header_headphone_image.png";
import header_playstation_image from "../assets/header_playstation_image.png";
import header_macbook_image from "../assets/header_macbook_image.png";
import arrow_icon from "../assets/arrow_icon.svg";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] py-12 md:px-20 px-6 mt-6 rounded-xl min-w-full shadow-sm"
          >
            <div className="md:w-1/2">
              <p className="text-sm font-semibold text-pink-500 mb-2 tracking-wide">{slide.offer}</p>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight max-w-xl">
                {slide.title}
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <button className="px-6 py-2 md:px-8 md:py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-medium shadow-md">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 text-pink-500 hover:text-pink-700 font-medium transition">
                  {slide.buttonText2}
                  <img
                    className="group-hover:translate-x-1 transition-transform w-4 h-4"
                    src={arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                className="w-60 md:w-80 object-contain"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-pink-500 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
