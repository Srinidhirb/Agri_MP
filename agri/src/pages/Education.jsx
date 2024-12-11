import React, { useState, useEffect, useRef } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
// Function to fetch videos from the Flask backend
const fetchVideos = async (keyword, sortBy) => {
  const response = await fetch(
    `http://127.0.0.1:5003/api/videos?keyword=${keyword}&sort=${sortBy}`
  );
  const data = await response.json();
  return data;
};

function Education() {
  const [keyword, setKeyword] = useState("agriculture");
  const [sortBy, setSortBy] = useState("views");
  const [videoUrls, setVideoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.keyword.value);
    setSortBy(e.target.sort.value);
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
    <div className="App container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        YouTube Videos on Agriculture
      </h1>
      <form
        onSubmit={handleSearch}
        className="mb-6 flex justify-center space-x-4"
      >
        <input
          type="text"
          name="keyword"
          placeholder="Search Keyword"
          defaultValue={keyword}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="sort"
          defaultValue={sortBy}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="comments">Comments</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-center">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center">
        {videoUrls.length > 0 ? (
          videoUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="relative h-[300px] group rounded-lg overflow-hidden bg-gray-100 shadow-lg">
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
  );
}

export default Education;
