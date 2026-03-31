import React from "react";
import NavLinks from "./NavLinks";
import SearchButton from "./SearchButton";

const MobileMenu = ({ isOpen, onClose, onSearch, user }) => {
  const handleSearchClick = () => {
    onSearch();  
    onClose();   
  };

  return (
    <div
      className={`md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg transform transition-all duration-300 ease-out origin-top z-40 ${
        isOpen
          ? "opacity-100 translate-y-0 scale-y-100"
          : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
      }`}
    >
      <nav className="flex flex-col items-center gap-6 py-6 text-base font-medium">
        <NavLinks onClick={onClose} user={user} />
        <SearchButton onClick={handleSearchClick} />
      </nav>
    </div>
  );
};

export default MobileMenu;
