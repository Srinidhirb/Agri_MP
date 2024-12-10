import React from "react";
import BannerBg from "../assets/images/banner.png";
import { Link } from "react-router-dom";

function Banner(props) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${BannerBg})` }}
        className="flex items-center flex-col justify-center gap-4 mt-16 h-80 bg-no-repeat bg-cover bg-center "
      >
        <div className="flex gap-4">
          {props.items.map((item, index) => (
            <React.Fragment key={index}>
              {/* Check if the item is 'home' */}
              <Link to={item === "Home" ? "/" : `/${item}`}>
                <span className="text-white text-sm capitalize">{item}</span>
              </Link>
              {index < props.items.length - 1 && (
                <span className="text-white">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-white text-4xl font-bold capitalize">{props.items[props.items.length - 1]}</p>
      </div>
    </>
  );
}

export default Banner;
