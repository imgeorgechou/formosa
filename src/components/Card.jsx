import React from "react";
export const Card = ({ scenicSpotName, picture, address }) => {
  return (
    <div className="max-w-sm min-w-[300px] bg-white border border-gray-200 rounded-[16px] shadow-sm hover:scale-105 transition-transform duration-300 my-5 cursor-pointer">
      <img
        className="rounded-t-lg"
        src={picture ? picture : `/hero.svg`}
        alt=""
      />
      <div className="px-5">
        <a href="#">
          <h3 className=" text-text-primary font-bold mt-3">
            {scenicSpotName}
          </h3>
        </a>
      </div>
      <div className="flex flex-wrap gap-7 p-5">
        <div className="flex items-center gap-2">
          <img src="/locate.svg" alt="" />
          <p className="body2 text-text-second font-normal">{address}</p>
        </div>
      </div>
    </div>
  );
};
