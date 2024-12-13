import React, { useState, useEffect, useRef } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

// Function to fetch videos from the Flask backend
const fetchVideos = async (keyword, sortBy) => {
  const response = await fetch(
    `http://127.0.0.1:5003/api/videos?keyword=${keyword}&sort=${sortBy}`
  );
  const data = await response.json();
  return data;
};

function Education() {
  const agriculture_keywords = [
    "agriculture",
    "farming",
    "crops",
    "sustainable farming",
    "agriculture technology",
    "precision farming",
    "organic farming",
    "plant breeding",
    "agriculture innovations",
    "agriculture machinery",
    "irrigation",
    "agricultural research",
    "agriculture practices",
  ];

  const [keyword, setKeyword] = useState("agriculture");
  const [sortBy, setSortBy] = useState("views");
  const [videoUrls, setVideoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.keyword.value);
    setSortBy(e.target.sort.value);
  };

  const handleTabClick = (selectedKeyword) => {
    setKeyword(selectedKeyword);
  };

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true);
      setLoading(true);
      setError(null);
      try {
        const data = await fetchVideos(keyword, sortBy);
        setVideoUrls(data.video_urls || []);
      } catch (error) {
        setError("An error occurred while fetching the videos.");
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    getVideos();
  }, [keyword, sortBy]);

  // Lazy loading logic for videos
  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5, // 50% of the video is visible before loading
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.src = videoElement.dataset.src; // Only set the src when in the viewport
          observer.unobserve(videoElement);
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [videoUrls]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <NavBar />
      
      <Banner items={["Home", "Services", "Education and Community "]} />
      <div className="flex w-full px-10 my-6 items-center justify-between">
        {/* Title Section */}
        <div className="text-lg font-semibold">
          AgriSphere – Grow Smart, Farm Better
        </div>

        {/* Right-End Section */}
        <div className="flex items-center space-x-4">
          <form
            onSubmit={handleSearch}
            className={`flex items-center space-x-4 transition-all duration-300`}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-[#F7C35F] text-white rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                >
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
                </svg>
              </button>
            </div>

            {isOpen && (
              <>
                <input
                  type="text"
                  name="keyword"
                  placeholder="Search Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="p-2 border border-gray-300 rounded transition-all duration-300"
                />
                <select
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded transition-all duration-300"
                >
                  <option value="views">Views</option>
                  <option value="likes">Likes</option>
                  <option value="comments">Comments</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#F7C35F] text-black p-2 rounded "
                >
                  Search
                </button>
              </>
            )}
          </form>
          <button
            type="button"
            className="p-2  text-black rounded-full border-2"
          >
            Community
          </button>
        </div>
      </div>

      <div className="App  mx-auto px-4 py-8">
        {/* Tabs Section */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center space-x-2">
          {agriculture_keywords.map((word, index) => (
            <button
            key={index}
            className={`px-4 py-2 border rounded-3xl capitalize  ${
              keyword === word
                ? "bg-[#F7C35F] text-black "
                : "bg-[#E9F1EE] text-gray-700 hover:bg-[#F7C35F]"
            }`}
            onClick={() => handleTabClick(word)}
          >
            {word}
          </button>
          
          ))}
        </div>

        {isLoading && <p className="text-center">Loading videos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="flex w-full flex-wrap gap-6 justify-center">
          {videoUrls.length > 0 ? (
            videoUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
              >
                <div className="relative h-[250px] group rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                  <iframe
                    ref={(el) => (videoRefs.current[index] = el)}
                    data-src={url} // Store the actual src here
                    width="100%"
                    height="515"
                    frameBorder="0"
                    allowFullScreen
                    title={`Video ${index + 1}`}
                    className="w-full h-full transition-all duration-300 transform group-hover:scale-105"
                  ></iframe>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No videos found.</p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Education;
