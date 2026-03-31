import { useState } from "react";

const SocialButton = ({ label }) => {
  const [showTip, setShowTip] = useState(false);

  return (
    <button
      type="button"
      className=" relative "
      onClick={() => {
        setShowTip(true);
        setTimeout(() => setShowTip(false), 1500); 
      }}
    >
      <span className="text-gray-500">{label}</span>
      {showTip && (
        <span className="absolute left-full top-0 ml-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg opacity-90 z-10 whitespace-nowrap">
          Coming Soon
        </span>
      )}
    </button>
  );
};

export default SocialButton;
