import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchButton from "./SearchButton";
import MobileMenu from "./MobileMenu";
import CartDrawer from "../features/cart/CartDrawer";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const accountRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity || 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleAuthChange = () => {
        };
        window.addEventListener('authChange', handleAuthChange);
        return () => window.removeEventListener('authChange', handleAuthChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsAccountOpen(false);
            }
        };

        if (isAccountOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAccountOpen]);

    const handleSearch = () => {
        navigate("/products?focus=search"); 
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsAccountOpen(false);
        window.dispatchEvent(new Event('authChange'));
        navigate("/auth");
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-md text-gray-800">
                <div className="flex w-full h-16 items-center justify-between px-4 md:px-10">
                    <Logo />

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 text-sm uppercase font-medium tracking-wide">
                        <NavLinks user={user} />
                    </nav>

                    <div className="flex gap-4 items-center relative">
                        <SearchButton onClick={handleSearch} className="hidden md:flex" />

                        {user && (
                            <div className="relative cursor-pointer" onClick={() => { setIsAccountOpen(false); setIsCartOpen(true); setIsMenuOpen(false); }}>
                                <IoCartOutline className="text-2xl hover:scale-110 transition-transform duration-150" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                                        {totalQuantity}
                                    </span>
                                )}
                            </div>
                        )}
                        
                        <div className="relative" ref={accountRef}>
                            {user ? (
                                <>
                                    <VscAccount
                                        className="text-xl hover:scale-110 transition-transform duration-150 cursor-pointer"
                                        onClick={() => { setIsAccountOpen(!isAccountOpen); setIsMenuOpen(false); }}
                                    />

                                    {isAccountOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>

                                            {user.role?.toLowerCase() !== "admin" && (
                                                <button
                                                    onClick={() => { setIsAccountOpen(false); navigate("/my-orders"); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    My Orders
                                                </button>
                                            )}

                                            {user.role === "admin" ? (
                                                <>
                                                    <button
                                                        onClick={() => { setIsAccountOpen(false); navigate("/admin/orders"); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Order Management
                                                    </button>
                                                    <button
                                                        onClick={() => { setIsAccountOpen(false); navigate("/admin"); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Admin Dashboard
                                                    </button>
                                                </>
                                            ) : null}

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="px-4 py-2 rounded-full bg-gray-900 text-white font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-102 active:shadow-sm"
                                >
                                    Login
                                </button>
                            )}
                        </div>

                        <button
                            className="md:hidden text-2xl"
                            onClick={() => { setIsAccountOpen(false); setIsMenuOpen(!isMenuOpen); }}
                        >
                            {isMenuOpen ? <IoClose /> : <IoMenu />}
                        </button>
                    </div>
                </div>

                <MobileMenu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    onSearch={handleSearch}
                    user={user}
                />
            </header>

            {user && (
                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                />
            )}
        </>
    );
};

export default NavBar;
