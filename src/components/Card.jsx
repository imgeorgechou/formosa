import React from "react";
import { Link } from "react-router-dom";
export const Card = ({ scenicSpotName, picture, address, id }) => {
  return (
    <Link
      to={`/scenic-spots/${id}`}
      className="max-w-sm min-w-[300px] bg-white border border-gray-200 rounded-[16px] shadow-sm hover:scale-105 transition-transform duration-300 my-5 cursor-pointer block"
    >
      <img
        className="rounded-t-lg"
        src={picture ? picture : `/hero.svg`}
        alt=""
      />
      <div className="px-5">
        <h3 className="text-text-primary font-bold mt-3">{scenicSpotName}</h3>
      </div>
      <div className="flex flex-wrap gap-7 p-5">
        <div className="flex items-center gap-2">
          <img src="/locate.svg" alt="" />
          <p className="body2 text-text-second font-normal">{address}</p>
        </div>
      </div>
    </Link>
  );
};
