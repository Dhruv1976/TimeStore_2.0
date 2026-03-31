import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "/assets/logo.png";

const Logo = () => (
    <Link to="/" className="flex items-center">
        <img src={LogoImg} alt="logo" className="h-7 md:h-9" />
    </Link>
);

export default Logo;
