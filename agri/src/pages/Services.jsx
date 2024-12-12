import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Soil from "../assets/images/Soil.png";
import Plant from "../assets/images/Plant.png";
import CLimate from "../assets/images/climate.png";
import Shareing from "../assets/images/sharing.png";
import Education from "../assets/images/education.png";
import Market from "../assets/images/market.jpg";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useUser } from "./UserContext"; // Assuming UserContext manages authentication

function Services() {
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Check authentication status
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login", { state: { from: location.pathname } }); // Pass the current path
    } else {
      // Simulate a loading delay
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
        <NavBar />
      <Banner items={["Home", "services"]} />
      <div className="flex justify-center mt-12 mb-8 items-center gap-8">
        <Link to="/soilcrop">
          <div
            className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
            style={{ backgroundImage: `url(${Soil})` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
              }}
            ></div>
            <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
              Soil Health <br /> Analysis
            </span>
          </div>
        </Link>
        <Link to="/Plant"><div
          className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
          style={{ backgroundImage: `url(${Plant})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
            Plant Diseases <br /> and Remedies
          </span>
        </div>
        </Link>
        <Link to="/weather">
        <div
          className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
          style={{ backgroundImage: `url(${CLimate})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
            Weather <br /> Prediction
          </span>
        </div>
        </Link>
      </div>
      <div className="flex justify-center  items-center gap-8">
        <div
          className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
          style={{ backgroundImage: `url(${Shareing})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
            Resource <br /> Sharing
          </span>
        </div>
        <div
          className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
          style={{ backgroundImage: `url(${Education})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
            Education and <br /> Community
          </span>
        </div>
        <div
          className="h-[26rem] bg-cover w-80 bg-center flex items-end relative "
          style={{ backgroundImage: `url(${Market})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <span className="ml-6 mb-8 text-white font-extrabold text-2xl shadow-md z-10">
            Market Price <br /> Prediction
          </span>
        </div>
      </div>
    </>
  );
}

export default Services;
