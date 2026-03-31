import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Cartier from "/assets/featuredBrand/Cartier.png";
import Omega from "/assets/featuredBrand/Omega.png";
import PatekPhilippe from "/assets/featuredBrand/PatekPhilippe.png";
import Rolex from "/assets/featuredBrand/Rolex.png";
import VacheronConstantin from "/assets/featuredBrand/VacheronConstantin.png";
import Card from "./Card";

const cardsData = [
  { img: Cartier, title: "Cartier", text: "Exquisite craftsmanship, timeless luxury" },
  { img: Omega, title: "Omega", text: "Pioneers in precision and innovation" },
  { img: PatekPhilippe, title: "Patek Philippe", text: "Masterpieces of tradition and heritage" },
  { img: Rolex, title: "Rolex", text: "A symbol of success and prestige" },
  { img: VacheronConstantin, title: "Vacheron Constantin", text: "A legacy of excellence and innovation" },
];

const Crousal = () => {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto my-6 px-4 md:px-6 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView="auto"
        spaceBetween={32}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-next-btn",
          prevEl: ".swiper-prev-btn",
        }}
        pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
        breakpoints={{
          0: { spaceBetween: 16, centeredSlides: true },
          640: { spaceBetween: 24, centeredSlides: true },
          1024: { spaceBetween: 32 },
        }}
        className="w-full"
      >
        {cardsData.map((card, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto flex justify-center"
          >
            <Card img={card.img} title={card.title} text={card.text} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition">
        <FiChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button className="swiper-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition">
        <FiChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      <div className="swiper-pagination-custom flex justify-center gap-2 mt-6"></div>
    </div>
  );
};

export default Crousal;
