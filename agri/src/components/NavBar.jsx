import React, { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom"; // Import Link for navigation
import SearchIcon from "../assets/icons/SearchIcon";
import Insta from "../assets/icons/Insta";
import Youtube from "../assets/icons/Youtube";
import Facebook from "../assets/icons/Facebook";
import Twitter from "../assets/icons/Twitter";
import NavImg from '../assets/images/NavImg.jpg';  // Correct path
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    setIsOpen(false);
  };

  // Close dropdown on outside click
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
      <div className= " bg-transparent relative flex items-center my-6 mx-8 justify-between">
        <div>Agrisphere</div>
        <div className="flex items-center  gap-8">
          <div className="flex gap-6 items-center">
            <div ref={dropdownRef} className="relative inline-block text-left">
              {/* Dropdown Button */}
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full  bg-white text-sm font-medium text-gray-700  "
              >
                EN
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={() => handleOptionClick("Account settings")}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      KAN
                    </button>
                    <button
                      onClick={() => handleOptionClick("Support")}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      HIN
                    </button>
                    <button
                      onClick={() => handleOptionClick("License")}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      TAM
                    </button>
                    <button
                      onClick={() => handleOptionClick("Sign out")}
                      className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      TEG
                    </button>
                  </div>
                </div>
              )}
            </div>
            <SearchIcon />
          </div>
          <div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center ">
                <Twitter/>
              </div>

              <div class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <Facebook/>

              </div>

              <div class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center ">
              <Youtube/>

              </div>

              <div class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center ">
              <Insta/>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 z-20 left-0 w-full">
      <div className=" bg-transparent   flex items-center justify-center h-[4.5rem]"  style={{ backgroundImage: `url(${NavImg})` }}>
      <nav >
        <ul className="flex gap-16">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/soilcrop">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/soilcrop">Projects</Link>
          </li>
          <li>
            <Link to="/soilcrop">News</Link>
          </li>
          <li>
            <Link to="/soilcrop">Contact</Link>
          </li>
        </ul>
      </nav>
      </div>
      </div>
    </>
  );
};

export default NavBar;
