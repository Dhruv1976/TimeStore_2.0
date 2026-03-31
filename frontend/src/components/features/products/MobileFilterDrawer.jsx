import React, { useEffect } from "react";

const MobileFilterDrawer = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >

        {children}
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
