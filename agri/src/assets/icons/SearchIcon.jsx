import React, { useState, useRef, useEffect } from "react";

const SearchIcon = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  return (
    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
      {/* The Search Icon */}
      <div onClick={toggleInput} style={{ cursor: "pointer" }}>
        <svg
          width="48"
          height="32"
          viewBox="0 0 55 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_3_626" fill="white">
            <path d="M0 0H55V36H0V0Z" />
          </mask>
          <path
  d="M1 36V0H-10V36H1Z"  // Increased width by changing -1 to -10
  fill="#E4E2D7"
  mask="url(#path-1-inside-1_3_626)"
/>

          <g clipPath="url(#clip0_3_626)">
            <path
              d="M54.7891 29.7812L48.9531 23.9453C49.7344 23.0391 50.3477 22.0156 50.793 20.875C51.2383 19.7344 51.4609 18.5234 51.4609 17.2422C51.4609 15.8203 51.1953 14.4922 50.6641 13.2578C50.1328 12.0078 49.4023 10.9219 48.4727 10C47.543 9.07812 46.4531 8.34375 45.2031 7.79688C43.9688 7.26562 42.6484 7 41.2422 7C39.8203 7 38.4922 7.26562 37.2578 7.79688C36.0078 8.34375 34.9219 9.07812 34 10C33.0781 10.9219 32.3438 12.0078 31.7969 13.2578C31.2656 14.4922 31 15.8203 31 17.2422C31 18.6484 31.2656 19.9688 31.7969 21.2031C32.3438 22.4531 33.0781 23.5391 34 24.4609C34.9219 25.3828 36.0078 26.1172 37.2578 26.6641C38.4922 27.1953 39.8203 27.4609 41.2422 27.4609C42.5234 27.4609 43.7344 27.2383 44.875 26.793C46.0156 26.3477 47.0391 25.7344 47.9453 24.9531L53.7812 30.7891C53.8438 30.8516 53.9219 30.9023 54.0156 30.9414C54.1094 30.9805 54.1953 31 54.2734 31C54.3672 31 54.4609 30.9844 54.5547 30.9531C54.6484 30.9219 54.7266 30.8672 54.7891 30.7891C54.9297 30.6484 55 30.4805 55 30.2852C55 30.0898 54.9297 29.9219 54.7891 29.7812ZM32.4297 17.2422C32.4297 16.0234 32.6641 14.8828 33.1328 13.8203C33.5859 12.7422 34.2109 11.8047 35.0078 11.0078C35.8047 10.2109 36.7422 9.58594 37.8203 9.13281C38.8828 8.66406 40.0234 8.42969 41.2422 8.42969C42.4453 8.42969 43.5859 8.66406 44.6641 9.13281C45.7266 9.58594 46.6562 10.2109 47.4531 11.0078C48.25 11.8047 48.875 12.7422 49.3281 13.8203C49.7969 14.8828 50.0312 16.0234 50.0312 17.2422C50.0312 18.4453 49.7969 19.5859 49.3281 20.6641C48.875 21.7266 48.25 22.6562 47.4531 23.4531C46.6562 24.25 45.7266 24.8828 44.6641 25.3516C43.5859 25.8047 42.4453 26.0312 41.2422 26.0312C40.0234 26.0312 38.8828 25.8047 37.8203 25.3516C36.7422 24.8828 35.8047 24.25 35.0078 23.4531C34.2109 22.6562 33.5859 21.7266 33.1328 20.6641C32.6641 19.5859 32.4297 18.4453 32.4297 17.2422Z"
              fill="#1F1E17"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_626">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="matrix(1 0 0 -1 31 31)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Input Field */}
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            fontSize: "16px",
            transition: "all 0.3s ease-in-out"
          }}
          
        />
      )}
    </div>
  );
};

export default SearchIcon;
