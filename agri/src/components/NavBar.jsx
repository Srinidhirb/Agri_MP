import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../pages/UserContext.js"; // Import useUser to manage authentication
import SearchIcon from "../assets/icons/SearchIcon";
import Globe from "../assets/icons/Globe";
import Insta from "../assets/icons/Insta";
import Youtube from "../assets/icons/Youtube";
import Facebook from "../assets/icons/Facebook";
import Twitter from "../assets/icons/Twitter";
import NavImg from "../assets/images/NavImg.jpg";
import { useTranslation } from "react-i18next";
const NavBar = () => {
  const location = useLocation();

  const { user, logout } = useUser(); // Access user state and logout function

  const { t } = useTranslation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout(); // Call the logout function if confirmed
    }
  };
  const handleLanguageSelectorClick = () => {
    sessionStorage.setItem('previousLocation', location.pathname); // Store current location
  };
  return (
    <>
      <div className="bg-transparent relative flex items-center my-6 mx-8 justify-between">
        <div
          style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          className="text-3xl"
        >
          Agrisphere
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-6 items-center">
          <Link to="/lang" onClick={handleLanguageSelectorClick}>
              <Globe className="cursor-pointer" />
            </Link>
            <SearchIcon />
          </div>
          <ul className="flex gap-6 w">
            {!user ? (
              <>
                <li>
                  <Link to="/login" state={{ from: location }}>
                  {t('login')}
                  </Link>
                </li>
                <li>
                  <Link to="/register">{t('register')}</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span>{user?.username}</span>
                  {/* Display logged-in user's name */}
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>{" "}
                  {/* Logout button with confirmation */}
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
                <Insta />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 z-20 left-0 w-full">
        <div
          className="bg-transparent flex items-center justify-center h-[4.5rem]"
          style={{ backgroundImage: `url(${NavImg})` }}
        >
          <nav>
            <ul className="flex gap-16">
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <Link to="/about">{t("about")}</Link>
              </li>
              <li>
                <Link to="/services">{t("services")}</Link>
              </li>
              <li>
                <Link to="/projects">{t("projects")}</Link>
              </li>
              <li>
                <Link to="/news">{t("news")}</Link>
              </li>
              <li>
                <Link to="/contact">{t("contact")}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default NavBar;
