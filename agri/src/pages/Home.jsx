import Navbar from "../components/NavBar";
import BG from "../assets/images/BG.png";
import IntroImg from "../assets/images/home2.png";
import Home3 from "../assets/images/home3.png";
import wheat from "../assets/images/wheat.png";
import blog from "../assets/images/blog.png";
import blog1 from "../assets/images/blog1.png";
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
import { useTranslation } from "react-i18next";
function HomePage() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
          {t('welcome')}
          </h1>
          <h2
            className="text-8xl sm:text-8xl font-semibold overflow-hidden mb-4 pt-6"
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          >
             {t('agriculture')}{" "}
            <span
              style={{
                color: "#EEC044",
                fontFamily: '"Covered By Your Grace", cursive',
              }}
            >
              &
            </span>{" "}
            <br />  {t('ecoFarming')}
          </h2>

          <p className="max-w-2xl  mb-6 text-lg sm:text-xm">
          {t('revolutionize')}          </p>
          <div className="flex gap-8">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-all duration-300">
            {t('discoverMore')}
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
             {t('ourIntroductions')}
          </h2>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
          {t('redefining')}         </h3>
          <p className="text-lg text-gray-700 mb-6">
          {t('welcomeToAgrisphere')}          </p>

          {/* Icons with Text */}
          <div className="flex space-x-12 mb-6">
            <div className="flex flex-col items-center">
            <span className="mb-2">🌱</span> 
              <p className="text-center text-sm text-gray-600">
              {t('enhancingProductivity')}              </p>
            </div>
            <div className="flex flex-col items-center">
            <span className="mb-2">💡</span> 
              <p className="text-center text-sm text-gray-600">
              {t('dataDrivenSolutions')}              </p>
            </div>
            <div className="flex flex-col items-center">
            <span className="mb-2">🌍</span> 
              <p className="text-center text-sm text-gray-600">
              {t('ecoFriendlyPractices')}              </p>
            </div>
          </div>

          {/* Text Under Icons */}
          <div className="flex items-center space-x-3 mb-8">
            <Tick />
            <p className="text-lg text-gray-700">
            {t('bridgingGap')}            </p>
          </div>
          <div className="flex items-center space-x-3 mb-8">
            <Tick />
            <p className="text-lg text-gray-700">
            {t('advancedTools')}            </p>
          </div>

          {/* Button */}
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-all duration-300">
          {t('discoverMore')}          </button>
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
             {t('whatWeDo')}
          </p>
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          {t('empoweringAgriculture')} <br />   {t('empoweringAgriculture2')}
          </h2>
          <div className="flex justify-between gap-8">
            {/* Card 1: Smart Farming Solutions */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg  max-w-xs">
              <img src={SMS} alt="" />
              <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">
              {t('smartFarmingSolutions')}
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
              {t('sustainablePracticesSupport')}
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
              {t('marketAccessEducation')}
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
        {t('whatWeOffer')}
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
            {t('plantDiseases')}
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
            {t('soilHealth')}
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
            {t('resourceSharing')}
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
          {t('knowMore')}
        </span>
        </Link>
      </div>
      <div className="py-16 px-8  flex flex-col items-center  ">
        <p
          style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          className="text-green-500 text-2xl font-normal"
        >
          {t('latestNews')}
        </p>
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
        {t('blogPosts')}
        </h2>
        <section className=" ">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {/* First Blog Post */}
        <div
  className="relative flex flex-col items-center justify-end bg-cover bg-center text-white p-6"
  style={{ backgroundImage: `url(${wheat})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
  
  {/* Content */}
  <h3 className="relative text-2xl font-semibold mb-2">Miscovery incommode earnestly commanded if.</h3>
  <p className="relative mb-4">Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.</p>
  <a href="#" className="relative text-white  flex items-center">
    CONTINUE READING <span className="ml-2">→</span>
  </a>
</div>
        <div className="flex h-96 gap-5">
        {/* Second Blog Post */}
        <div className="bg-white  ">
          <img src={blog} alt="" />
          <div className="flex items-center space-x-2 mt-2 mb-4">
            <div className="bg-green-200 text-green-800 px-3 py-1 rounded font-bold">26</div>
            <span className="text-gray-600 text-sm">Aug, 2023</span>
          </div>
          <h3 className="text-lg font-semibold px-4 mb-2">Expression acceptance imprudence particular</h3>
          <p className="text-gray-500 text-sm px-4 mb-4">Md Sohag • 25 April, 2023</p>
          <a href="#" className="text-blue-600 px-4  flex items-center">
            CONTINUE READING <span className="ml-2">→</span>
          </a>
        </div>

        {/* Third Blog Post */}
        <div className="bg-white  ">
        <img src={blog1} alt="" />
          <div className="flex items-center space-x-2 mt-2 mb-4">
            <div className="bg-orange-200 text-orange-800 px-3 py-1 rounded font-bold">08</div>
            <span className="text-gray-600 text-sm">Dec, 2023</span>
          </div>
          <h3 className="text-lg font-semibold px-4 mb-2">Considered imprudence of technical friendship.</h3>
          <p className="text-gray-500 text-sm px-4 mb-4">Md Sohag • 25 April, 2023</p>
          <a href="#" className="text-blue-600 px-4  flex items-center">
            CONTINUE READING <span className="ml-2">→</span>
          </a>
        </div>
        </div>
      </div>
    </section>
      </div>
        <Footer/>
    </div>
    
  );
}

export default HomePage;
