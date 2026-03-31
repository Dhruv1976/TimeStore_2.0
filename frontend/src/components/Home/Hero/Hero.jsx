import React, { useEffect, useState } from "react";
import sportsImg from "/assets/sports.png";
import classicImg from "/assets/classic.png";
import luxuryImg from "/assets/luxary.png";
import { useNavigate } from "react-router-dom";


const watches = [
    {
        img: luxuryImg,
        title: "Luxury Watch",
        tagline: "Timeless Elegance on Your Wrist",
    },
    {
        img: classicImg,
        title: "Classic Collection",
        tagline: "Where Style Meets Precision",
    },
    {
        img: sportsImg,
        title: "Modern Sport",
        tagline: "Built for Speed & Performance",
    },
];

const Home = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % watches.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-11 md:py-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 overflow-hidden">

            {/* Text */}
            <div className="min-w-1/2 z-10 pt-6 md:pt-0 text-center md:text-left text-gray-900 space-y-3 sm:space-y-4 md:space-y-6 max-w-lg">
                <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-sm transition-opacity duration-1000">
                    {watches[index].title}
                </h1>
                <p className=" mb-0 text-sm sm:text-base md:text-xl opacity-90 leading-relaxed transition-opacity duration-1000">
                    {watches[index].tagline}
                </p>
                <button className="mt-3 hidden md:inline-block sm:mt-5 px-5 sm:px-8 py-2 sm:py-3 bg-gray-900 text-white rounded-full shadow-md font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-102 active:shadow-sm " onClick={() => { navigate("/products") }}>
                    Explore Collections
                </button>
            </div>

            <div className="relative w-full md:my-6 max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] aspect-square flex justify-center items-center z-10 ">
                {watches.map((watch, i) => (
                    <img
                        key={i}
                        src={watch.img}
                        alt={watch.title}
                        className={`absolute w-full h-full object-contain drop-shadow-lg transform transition-all duration-[1500ms] ease-in-out
        ${i === index ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-full scale-95"}`}
                    />
                ))}
            </div>

            <button className="mb-5 md:hidden px-5 sm:px-8 py-2 sm:py-3 bg-gray-900 text-white rounded-full shadow-md font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-102 active:shadow-sm " onClick={() => { navigate("/products") }}>
                Explore Collection
            </button>
        </div>
    );
};

export default Home;
