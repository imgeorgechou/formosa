import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { THEME_TYPES } from "./Header";

export const Search = ({ selectedTheme, selectedLocations }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchText) searchParams.append("keyword", searchText);
    if (selectedLocations?.length > 0)
      searchParams.append("city", selectedLocations[0].id);
    if (selectedTheme) searchParams.append("theme", selectedTheme);

    const queryString = searchParams.toString();
    if (selectedTheme === THEME_TYPES.SCENIC) {
      navigate(`/scenicspots${queryString ? `?${queryString}` : ""}`);
    } else if (selectedTheme === THEME_TYPES.FOOD) {
      navigate(`/food${queryString ? `?${queryString}` : ""}`);
    }
  };

  return (
    <div className="relative flex items-center px-[16px] mt-4">
      <input
        type="text"
        placeholder={`搜尋${
          selectedTheme === THEME_TYPES.SCENIC
            ? "風景區"
            : selectedTheme === THEME_TYPES.FOOD
            ? "美食"
            : "關鍵字"
        }`}
        className="bg-white w-full h-[43px] px-[8px] pr-[32px] border-[1px] border-line rounded-[8px]"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <img
        src="/Search.svg"
        className="absolute right-[24px] top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};
