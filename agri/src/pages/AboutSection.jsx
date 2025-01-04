import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import SMS from "../assets/images/Smart.png";
import SPS from "../assets/images/Sustainable.png";
import MEM from "../assets/images/Market.png";
import Home3 from "../assets/images/home3.png";
import Tick from "../assets/icons/Tick";
import About from "../assets/images/aboutimg.png";
import AboutBg from "../assets/images/aboutbanner.png";
import Video from "../assets/images/video.mp4";
import Footer from "../components/Footer";
const AboutSection = () => {

const teamMembers = [
  {
    id: 1,
    name: 'Srinidhi R Bharadwaj',
    title: 'Team Lead',
    description: 'A 4th-year BTech Artificial Intelligence and Data Science student, combines leadership skills and technical expertise to drive innovation and deliver impactful results.',
    email: 'srinnidhirbharadwaj@gmail.com',
   
  },
  {
    id: 2,
    name: 'Dhaarini K N Hathwar ',
    title: 'Developer',
    description: 'A skilled Developer with a passion for solutions that blends technical expertise with a problem-solving mindset to deliver high-quality software and applications.',
    email: 'dhaarinihathwar@gmail.com',
   
  },
  {
    id: 3,
    name: 'Yashas Kishore',
    title: 'Developer ',
    description: 'A Developer with a strong foundation in software development, applies technical expertise skills to create innovative solutions, consistently delivering high-quality results.',
    email: 'yashaskishore3@gmail.com',
  
  },
  {
    id: 4,
    name: 'Indu K',
    title: 'Developer',
    description: ' a Developer with a passion for coding and problem-solving, creates efficient, effective and innovative solutions with strong technical and critical thinking expertise.',
    email: 'induk5107@gmail.com',
    
  },
];
  const testimonials = [
    {
      text: "AgriSphere has transformed the way we approach farming. The market price prediction tool helps us make informed decisions, while the weather updates ensure we're always prepared for changes. It's a game-changer for modern agriculture!",
      image:
        "https://images.pexels.com/photos/6625914/pexels-photo-6625914.jpeg",
      name: "Rajesh Kumar",
      position: "Farmer",
    },
    {
      text: "As a part of the agricultural community, I find the plant diseases and remedies feature invaluable. It has significantly improved crop health and saved us time and money. The insights are practical and easy to implement.",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Priya Verma",
      position: "Agricultural Consultant",
    },
  ];
  
  return (
    <>
      <NavBar />
      <Banner items={["Home", "About Us"]} />
      <div className="flex items-center justify-center  py-16 px-8 bg-gray-50">
        {/* Left Section: Image */}
        <div className="w-[40%] flex items-end justify-end">
          <img
            src={About} // Your image source
            alt="Intro Image"
            className="w-full "
          />
        </div>

        {/* Right Section: Text */}
        <div className="w-2/5 ">
          <h2
            className="text-orange-500  text-2xl mb-2 "
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          >
            Get to Know Us
          </h2>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Cultivating Innovation in Agriculture
          </h3>
          <p className="text-green-500 my-4 text-xl">
          At Agrisphere, we don’t just see agriculture as a tradition—we see it as a powerful force for global change.
          </p>

          <p className="text-lg text-gray-700 mb-6">
          Agriculture is the backbone of our communities, and we are here to strengthen it. Agrisphere is a hub where technology meets agriculture, providing farmers with resources to grow smarter, faster, and more sustainably. Whether you’re a small-scale farmer or part of a large cooperative, we’re here to make your work simpler and more effective.
          </p>

          {/* Icons with Text */}

          {/* Text Under Icons */}
          <div className="flex items-center space-x-3 mb-2">
            <Tick />
            <p className="text-lg text-gray-700">
            Smart Decisions with Data: Empowering farmers through analytics and insights.</p>
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Tick />
            <p className="text-lg text-gray-700">
            Farming Sustainably: Promoting eco-friendly practices to preserve soil and water.
            </p>
          </div>
          <div className="flex items-center space-x-3 mb-8">
            <Tick />
            <p className="text-lg text-gray-700">
            Connecting Farmers: Building resilient communities by linking farmers to markets.
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
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
      <video src={Video} className="w-full" autoPlay controls ></video>
      </div> */}
      <div
        style={{ backgroundImage: `url(${AboutBg})` }}
        className="h-[60vh]\ bg-cover flex-col  flex items-center justify-center"
      >
        <div className="text-center ">
          <h3
            className="text-orange-500 text-2xl my-6 font-normal"
            style={{ fontFamily: '"Covered By Your Grace", cursive' }}
          >
            Testimonials
          </h3>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            What They Say
          </h3>
        </div>
        <section className="w-full">
          <div className="container mx-auto flex flex-wrap justify-center gap-6 px-4 py-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-md shadow-md p-6 text-center w-full md:w-[30%]"
              >
                <p className="text-gray-600 text-sm">{`“${testimonial.text}”`}</p>
                <div className="flex justify-center pt-4 pb-2">
                  <img
                    className="w-14 h-14 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>
                <div className="text-gray-600 font-medium">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonial.position}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-semibold mb-8">Our Team</h2>
      <div className="flex  ">
        {/* Card 1 */}
        <div className="flex  ">
        {teamMembers.map((member) => (
          <div key={member.id} className="w-full sm:w-1/3 px-4 mb-8">
            <div className="card shadow rounded-lg overflow-hidden">
            
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold">{member.name}</h2>
                <p className="text-gray-500 text-sm">{member.title}</p>
                <p className="text-gray-700 mt-2">{member.description}</p>
                <p className="text-gray-500 mt-2">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutSection;
