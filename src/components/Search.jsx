import React from "react";

export const Search = () => {
  return (
    <div className="relative flex items-center px-[16px] mt-4 ">
      <input
        type="text"
        placeholder="搜尋關鍵字"
        className="bg-white w-full h-[43px] px-[8px] pr-[32px] border-[1px] border-line rounded-[8px]"
      ></input>
      <img
        src="/Search.svg"
        className="absolute right-[24px] top-1/2 -translate-y-1/2 cursor-pointer"
      ></img>
    </div>
  );
};
