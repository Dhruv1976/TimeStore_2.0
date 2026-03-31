import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, text }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center bg-gray-100 rounded-2xl shadow-md w-[280px] md:w-[320px] p-4 transition-transform duration-300 hover:scale-105 my-3" onClick={() => { navigate('/products'); }}>
            <img
                src={img}
                alt={title}
                className="w-28 h-auto object-contain mb-4 "
            />

            <h2 className="text-lg font-semibold text-gray-800 text-center">
                {title}
            </h2>
            <p className="text-sm text-gray-600 text-center">{text}</p>
        </div>
    );
};

export default Card;
