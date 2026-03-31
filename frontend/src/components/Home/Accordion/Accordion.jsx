import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';


const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const data = [
        {
            heading: "What types of watches do you offer?",
            data: "We offer a curated collection of luxury, casual, sport, and smartwatches for both men and women. Whether you're looking for classic analog styles or modern digital features, we have something for every lifestyle."
        },
        {
            heading: "Are your watches authentic and under warranty?",
            data: "Yes, all our watches are 100% authentic and come with a manufacturer’s warranty. We partner only with trusted brands to ensure quality and peace of mind with every purchase."
        },
        {
            heading: "Do you offer watch sizing or adjustment services?",
            data: "Absolutely! We provide complimentary sizing and adjustment services with every purchase. Simply include your wrist size at checkout or visit us in-store for a perfect fit."
        },
        {
            heading: "Can I return or exchange my watch if I'm not satisfied?",
            data: "Yes, we offer a hassle-free return and exchange policy within 7 days of purchase. The watch must be in original condition with all packaging intact. Please review our return policy for full details."
        },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {data.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                    <div key={index} className="border-b border-gray-200">
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200 font-medium text-gray-700
                     text-base "
                        >
                            {`${index + 1}. ` + item.heading}
                            <FiChevronDown
                                className={`transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
                                size={20}
                            />
                        </button>

                        {isOpen && (
                            <div className="px-8 py-3 text-gray-500 bg-white
                          text-sm sm:text-base "
                            >
                                {item.data}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

    );
};

export default Accordion;
