import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about-us", label: "About Us" },
];

const NavLinks = ({ onClick }) => (
  <>
    {links.map((link, i) => (
      <NavLink
        key={i}
        to={link.to}
        onClick={onClick}
        className={({ isActive }) =>
          `transition-colors duration-200 ${isActive
            ? "text-gray-900 font-semibold"
            : "text-gray-600 hover:text-gray-900"
          }`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </>
);

export default NavLinks;
