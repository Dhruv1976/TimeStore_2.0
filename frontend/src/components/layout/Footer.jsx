import React from 'react';
import logoImg from "/assets/logo.png";
import { Link } from 'react-router-dom';
import SocialButton from './SocialButton';

const Footer = () => {
  return (
    <footer className="w-full py-10 ">
      <div className="max-w-6xl mx-auto px-6  border-t border-gray-300 pt-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-gray-800">
        <div className="flex flex-col md:col-span-2 gap-2 text-gray-500">
          <img src={logoImg} alt="logo" className="w-60 mb-2" />
          <p className="mb-2">Sophisticated simplicity for the independent mind.</p>
          <p className="mb-1">Phone: (+91) 1800 00 00</p>
          <p>Email: hello@domain.com</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-gray-900">About Menu</h3>
          <div className="flex flex-col gap-3 text-gray-500">
            <Link to="/" className="transition duration-300 ease  hover:translate-x-3 hover:text-gray-900" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Home</Link>
            <Link to="/products" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">Products</Link>
            <Link to="/about-us" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">About Us</Link>
          </div>
        </div>

        <div >
          <h3 className="font-semibold mb-4 text-gray-900">Useful Links</h3>
          <div className="flex flex-col gap-3 text-gray-500">
            <Link to="/privacy-policy" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">Privacy Policy</Link>
            <Link to="/return-policy" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">Return Policy</Link>
          </div>
        </div>

        <div >
          <h3 className="font-semibold mb-4 text-gray-900">Follow Us</h3>
          <div className="flex flex-col gap-3 text-gray-500">
            <Link to="#" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">
              <SocialButton label="Instagram" />
            </Link>

            <Link to="#" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">
              <SocialButton label="Facebook" />
            </Link>

            <Link to="#" className="transition duration-300 ease hover:translate-x-3 hover:text-gray-900">
              <SocialButton label="Twitter" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-gray-300 text-center text-gray-500">
        <p>© {new Date().getFullYear()} TimeStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;