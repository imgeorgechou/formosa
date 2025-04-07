import React from "react";
import { Link } from "react-router-dom";
export const List = ({ title }) => {
  return (
    <div className="flex justify-between items-center mt-5 mx-5">
      <div className="flex">
        <img src="/location.svg" alt="" className="mr-3" />
        <h2 className="text-[25px] font-bold">{title}</h2>
      </div>
      {title === "景點推薦" ? (
        <Link to="/scenic-spots" className="text-primary cursor-pointer">
          更多{title}
        </Link>
      ) : (
        <p className="text-primary cursor-pointer">更多</p>
      )}
    </div>
  );
};
