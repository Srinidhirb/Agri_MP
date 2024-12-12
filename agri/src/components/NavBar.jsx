import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../pages/UserContext.js'; // Import useUser to manage authentication

import SearchIcon from "../assets/icons/SearchIcon";
import Insta from "../assets/icons/Insta";
import Youtube from "../assets/icons/Youtube";
import Facebook from "../assets/icons/Facebook";
import Twitter from "../assets/icons/Twitter";
import NavImg from '../assets/images/NavImg.jpg'; 

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useUser(); // Access user state and logout function

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-transparent relative flex items-center my-6 mx-8 justify-between">
        <div style={{ fontFamily: '"Covered By Your Grace", cursive' }} className="text-3xl">Agrisphere</div>
        <div className="flex items-center gap-8">
          <div className="flex gap-6 items-center">
            <div ref={dropdownRef} className="relative inline-block text-left">
              <button onClick={toggleDropdown} className="inline-flex justify-center w-full bg-white text-sm font-medium text-gray-700">
                EN
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button onClick={() => handleOptionClick("Account settings")} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">KAN</button>
                    <button onClick={() => handleOptionClick("Support")} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">HIN</button>
                    <button onClick={() => handleOptionClick("License")} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">TAM</button>
                    <button onClick={() => handleOptionClick("Sign out")} className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">TEG</button>
                  </div>
                </div>
              )}
            </div>
            <SearchIcon />
          </div>
          <ul className="flex  gap-6"> 
          {!user ? (
                <>
                  <li>
                  <Link to="/login" state={{ from: location }}>
      Login
    </Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                  <span>{user?.username}</span>
                  {/* Display logged-in user's name */}
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button> {/* Logout button */}
                  </li>
                </>
              )}
          </ul>
          <div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                <Twitter />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                <Facebook />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                <Youtube />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                <Insta />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="absolute top-20 z-20 left-0 w-full">
        <div className="bg-transparent flex items-center justify-center h-[4.5rem]" style={{ backgroundImage: `url(${NavImg})` }}>
          <nav>
            <ul className="flex gap-16">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/">Projects</Link>
              </li>
              <li>
                <Link to="/">News</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              {/* Conditionally render Login/Register or Username/Logout */}
              
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
