import Navbar from "../components/NavBar";
import BG from "../assets/images/BG.png";
import IntroImg from "../assets/images/home2.png";
import Home3 from "../assets/images/home3.png";
import Leaf from "../assets/images/leaf.png";
import Tick from "../assets/icons/Tick";
import SMS from "../assets/images/Smart.png";
import SPS from "../assets/images/Sustainable.png";
import MEM from "../assets/images/Market.png";
import PD from "../assets/images/pd.png";
import SH from "../assets/images/sh.png";
import RS from "../assets/images/rs.png";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="">
      <Navbar />

      <div
        className="relative w-full h-screen bg-cover bg-top mt-16 flex justify-center"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="relative z-10 flex flex-col items-start justify-center h-full w-10/12 text-white ">
          <h1 className="text-xs sm:text-xs font-bold mb-4">
            WELCOME TO AGRI SPHERE
          </h1>
          <h2
            className="text-8xl sm:text-8xl font-semibold mb-4"
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          >
            Agriculture{" "}
            <span
              style={{
                color: "#EEC044",
                fontFamily: '"Covered By Your Grace", cursive',
              }}
            >
              &
            </span>{" "}
            <br /> Eco Farming
          </h2>

          <p className="max-w-lg  mb-6 text-lg sm:text-xm">
          Revolutionize your farming with cutting-edge solutions that streamline decision-making and maximize productivity. Access tailored insights for efficient crop management, optimal resource use, and market preparedness. Take a step toward a more sustainable, profitable, and future-ready agriculture.
          </p>
          <div className="flex gap-8">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-all duration-300">
              Discover More
            </button>
            <img src={Leaf} alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 justify-center  py-16 px-8 bg-gray-50">
        {/* Left Section: Image */}
        <div className="w-1/3">
          <img
            src={IntroImg} // Your image source
            alt="Intro Image"
            className="w-full "
          />
        </div>

        {/* Right Section: Text */}
        <div className="w-2/4 pl-12">
          <h2
            className="text-orange-500  text-2xl mb-2 "
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          >
            Our Introductions
          </h2>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
          Redefining Agriculture for a Smarter, Sustainable Future.          </h3>
          <p className="text-lg text-gray-700 mb-6">
          Welcome to Agrisphere, where innovation drives sustainable agriculture. Our platform equips farmers with smart tools and insights to boost productivity, optimize resources, and embrace eco-friendly practices. Together, we’re shaping a future where farming thrives in harmony with the environment.
          </p>

          {/* Icons with Text */}
          <div className="flex space-x-12 mb-6">
            <div className="flex flex-col items-center">
            <span className="mb-2">🌱</span> 
              <p className="text-center text-sm text-gray-600">
              Enhancing Productivity
              </p>
            </div>
            <div className="flex flex-col items-center">
            <span className="mb-2">💡</span> 
              <p className="text-center text-sm text-gray-600">
              Data-Driven Solutions
              </p>
            </div>
            <div className="flex flex-col items-center">
            <span className="mb-2">🌍</span> 
              <p className="text-center text-sm text-gray-600">
              Eco-Friendly Practices
              </p>
            </div>
          </div>

          {/* Text Under Icons */}
          <div className="flex items-center space-x-3 mb-8">
            <Tick />
            <p className="text-lg text-gray-700">
            Bridging the gap between tradition and technology.
            </p>
          </div>
          <div className="flex items-center space-x-3 mb-8">
            <Tick />
            <p className="text-lg text-gray-700">
            Advanced tools for crop planning and market readiness.
            </p>
          </div>

          {/* Button */}
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-all duration-300">
            Discover More
          </button>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${Home3})` }}
        className="h-[100vh] w-full bg-cover bg-center flex items-center justify-center"
      >
        <div className="py-16 px-8  flex flex-col items-center ">
          <p
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
            className="text-green-500 text-2xl font-normal"
          >
            What We Do
          </p>
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
            Empowering Agriculture <br /> Through Innovation and Insight
          </h2>
          <div className="flex justify-between gap-8">
            {/* Card 1: Smart Farming Solutions */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg  max-w-xs">
              <img src={SMS} alt="" />
              <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">
                SMART FARMING SOLUTIONS
              </h3>
              <p className="text-gray-600">
                Seeking to offer your farm’s yield with smart farming solutions.
                Deliver new ways from sustainable farming practices with modern
                tech and smarter techniques.
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-yellow-500 font-bold">Learn More</span>
              </div>
            </div>

            {/* Card 2: Sustainable Practices Support */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg  max-w-xs">
              <img src={SPS} alt="" />
              <h3 className="text-xl font-semibold text-gray-800 my-5">
                SUSTAINABLE PRACTICES SUPPORT
              </h3>
              <p className="text-gray-600">
                Providing your farm with sustainable methods and support. Access
                resources that assist with eco-friendly techniques and help
                increase efficiency.
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-yellow-500 font-bold">Learn More</span>
              </div>
            </div>

            {/* Card 3: Market Access and Education */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg  max-w-xs">
              <img src={MEM} alt="" />
              <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">
                MARKET ACCESS AND EDUCATION
              </h3>
              <p className="text-gray-600">
                Delivering new ways to access markets and learn about the latest
                trends. We connect farmers to their desired markets and educate
                them about upcoming trends.
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-yellow-500 font-bold">Learn More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-8  flex flex-col items-center bg-[#F8F7F0] ">
        <p
          style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          className="text-orange-500 text-2xl font-normal"
        >
          Our Services
        </p>
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          What We Offer
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {/* Service Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src={PD}
              alt="Plant Diseases and Remedies"
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold mt-4">
              Plant Diseases and Remedies
            </h3>
            <p className="text-gray-600 mt-2">
              Diagnose plant diseases with ease and access proven remedies to
              protect crop health and yield.
            </p>
          </div>
          {/* Service Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src={SH}
              alt="Soil Health Analysis"
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold mt-4">
              Soil Health Analysis and Suitability
            </h3>
            <p className="text-gray-600 mt-2">
              Upload soil reports for a detailed analysis, including
              recommendations for crops suited to the soil's specific
              characteristics.
            </p>
          </div>
          {/* Service Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src={RS}
              alt="Resource Sharing"
              className="rounded-t-lg w-full  object-cover"
            />
            <h3 className="text-xl font-bold mt-4">
              Resource Sharing and Community{" "}
            </h3>
            <p className="text-gray-600 mt-2">
              A platform for farmers to share or borrow equipment, labor, and
              other resources, fostering a supportive agricultural community.
            </p>
          </div>
        </div>
        <Link to="/services">
        <span
          style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          className=" mt-4  underline cursor-pointer text-orange-500 text-2xl font-normal"
        >
          Know More
        </span>
        </Link>
      </div>
      <div className="py-16 px-8  flex flex-col items-center  ">
        <p
          style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          className="text-green-500 text-2xl font-normal"
        >
          Latest News
        </p>
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
        Check out our blog posts
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          
        </div>
      </div>
        <Footer/>
    </div>
    
  );
}

export default HomePage;
