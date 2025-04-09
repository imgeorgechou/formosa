import React from "react";
import { useState } from "react";
import { Searchlocation } from "./Searchlocation";
import { Search } from "./Search";
import { Link, useNavigate } from "react-router-dom";

export const THEME_TYPES = {
  SCENIC: "scenic",
  FOOD: "food",
};
export const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // 切換導航欄展開/折疊
  const toggleNavExpansion = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  // 處理搜尋
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedTheme) params.append("theme", selectedTheme);
    if (selectedLocations.length > 0)
      params.append("city", selectedLocations[0]);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <nav className="relative">
      <header className="grid grid-cols-3 bg-white shadow-default h-[56px] w-full lg:flex lg:justify-start lg:w-[300px] lg:fixed">
        {/* 在大螢幕隱藏漢堡選單按鈕 */}
        <div className="flex items-center ml-[16px] lg:hidden">
          <button onClick={toggleNavExpansion}>
            <div className="flex items-center justify-center bg-primary-lighter rounded-[8px] w-[32px] h-[32px] cursor-pointer">
              <img
                src="/setting.svg"
                alt="搜尋篩選"
                className="w-[24px] h-[24px]"
              />
            </div>
          </button>
        </div>
        <Link to="/" className="flex items-center justify-center ml-4">
          <img src="/logo.png" alt="" className="w-[99.15px] h-[40px]" />
        </Link>
      </header>
      {/* 導航欄內容 */}
      <div
        className={`
          bg-bg-white 
          ${isNavExpanded ? "block" : "hidden"} 
          lg:block 
          lg:fixed 
          lg:left-0 
          lg:top-[56px] 
          lg:h-[calc(100vh-56px)] 
          lg:w-[300px] 
          lg:shadow-lg
        `}
      >
        <Searchlocation
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
        <Search
          selectedTheme={selectedTheme}
          selectedLocations={selectedLocations}
        />
        <p className="text-[18px] font-bold ml-5 mt-3">精選主題</p>
        <div className="flex justify-evenly">
          <div
            className={`flex flex-col items-center mt-3 cursor-pointer p-2 rounded-lg ${
              selectedTheme === THEME_TYPES.SCENIC
                ? "border-2 border-primary"
                : ""
            }`}
            onClick={() => setSelectedTheme(THEME_TYPES.SCENIC)}
          >
            <img src="/scenic.png" alt="風景區" />
            <p className="mt-1">風景區</p>
          </div>
          <div
            className={`flex flex-col items-center mt-3 cursor-pointer p-2 rounded-lg ${
              selectedTheme === THEME_TYPES.FOOD
                ? "border-2 border-primary"
                : ""
            }`}
            onClick={() => setSelectedTheme(THEME_TYPES.FOOD)}
          >
            <img src="/food.png" alt="美食品嚐" />
            <p className="mt-1">美食品嚐</p>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={handleSearch}
            className="bg-primary text-center text-white w-[90%] p-2 rounded-[8px] cursor-pointer"
          >
            開始搜尋
          </button>
        </div>
      </div>
    </nav>
  );
};
