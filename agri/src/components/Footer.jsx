import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-12 text-white py-10">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        {/* Logo and About */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4"  style={{ fontFamily: '"Covered By Your Grace", cursive' }}>AgriSphere</h2>
          <p className="text-gray-400 mb-4">
            There are many variations of passages of lorem ipsum available, but
            the majority suffered.
            There are many variations of passages of lorem ipsum available, but
            the majority suffered.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Meet the Farmers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Latest News
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* News Section */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">News</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="block font-bold text-white">
                  Bringing Food Production Back To Cities
                </span>
                <span className="text-yellow-500 text-sm">July 5, 2022</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="block font-bold text-white">
                  The Future of Farming, Smart Irrigation Solutions
                </span>
                <span className="text-yellow-500 text-sm">July 5, 2022</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <span className="inline-block w-6 mr-2 text-green-500">
                <i className="fas fa-phone-alt"></i>
              </span>
              666 888 0000
            </li>
            <li>
              <span className="inline-block w-6 mr-2 text-green-500">
                <i className="fas fa-envelope"></i>
              </span>
              needhelp@company.com
            </li>
            <li>
              <span className="inline-block w-6 mr-2 text-green-500">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              80 Brooklyn Golden Street Line, New York, USA
            </li>
          </ul>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-2 w-2/3 text-gray-900 rounded-l-md"
            />
            <button className="bg-green-500 p-2 rounded-r-md text-white">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p>
          © All Copyright 2024 by <span className="text-white">shawonetc Themes</span>
        </p>
        <p className="mt-2">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
