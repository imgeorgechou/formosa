import React from "react";

export const List = ({ title }) => {
  return (
    <div className="px-[16px] my-[24px]">
      {/* 標題欄 */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center ">
          <img src="/location.svg" alt="" />
          <h3 className=" font-bold ml-[8px] ">{title}</h3>
        </div>
        <div>
          <p className=" mobile-body1 text-primary font-normal cursor-pointer">
            更多{title}
          </p>
        </div>
      </div>
    </div>
  );
};
