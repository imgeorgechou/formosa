import React from "react";
export const Spinner = () => {
  return (
    <div className="flex items-center justify-center mb-30">
      <div className="loader flex justify-center">
        <div className="cell d-0"></div>
        <div className="cell d-1"></div>
        <div className="cell d-2"></div>

        <div className="cell d-1"></div>
        <div className="cell d-2"></div>

        <div className="cell d-2"></div>
        <div className="cell d-3"></div>

        <div className="cell d-3"></div>
        <div className="cell d-4"></div>
      </div>
    </div>
  );
};
