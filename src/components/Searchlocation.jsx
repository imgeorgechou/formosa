import React from "react";
import { useState } from "react";
import { X } from "lucide-react";

export const Searchlocation = ({ selectedLocations, setSelectedLocations }) => {
  // 台灣縣市 - 使用英文名稱作為ID
  const locations = [
    { id: "Taipei", name: "台北" },
    { id: "NewTaipei", name: "新北" },
    { id: "Taoyuan", name: "桃園" },
    { id: "Taichung", name: "台中" },
    { id: "Tainan", name: "台南" },
    { id: "Kaohsiung", name: "高雄" },
    { id: "Keelung", name: "基隆" },
    { id: "Hsinchu", name: "新竹市" },
    { id: "HsinchuCounty", name: "新竹縣" },
    { id: "MiaoliCounty", name: "苗栗" },
    { id: "ChanghuaCounty", name: "彰化" },
    { id: "NantouCounty", name: "南投" },
    { id: "YunlinCounty", name: "雲林" },
    { id: "ChiayiCounty", name: "嘉義縣" },
    { id: "Chiayi", name: "嘉義市" },
    { id: "PingtungCounty", name: "屏東" },
    { id: "YilanCounty", name: "宜蘭" },
    { id: "HualienCounty", name: "花蓮" },
    { id: "TaitungCounty", name: "台東" },
    { id: "KinmenCounty", name: "金門" },
    { id: "PenghuCounty", name: "澎湖" },
    { id: "LienchiangCounty", name: "連江" },
  ];

  // 控制位置下拉選單是否開啟的狀態
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
  };

  // 添加位置到選擇列表（只保留一個）
  const addLocation = (location) => {
    setSelectedLocations([location]); // 直接用新的位置替換整個陣列
  };

  // 從選擇列表中移除位置
  const removeLocation = (locationId) => {
    setSelectedLocations(
      selectedLocations.filter((location) => location.id !== locationId)
    );
  };
  return (
    <div>
      <div className="relative flex items-center px-[16px] ">
        <div className="bg-white w-full h-[40px] px-[8px] pr-[32px] border-[1px] border-line rounded-[8px]">
          <div className="flex-1 flex flex-wrap items-center gap-1">
            {/* 顯示已選擇的位置或提示文字 */}
            {selectedLocations.length > 0 ? (
              selectedLocations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center  px-3 py-1 text-[16px] mt-1"
                >
                  {location.name}
                  <X
                    className="ml-1 h-4 w-4 cursor-pointer text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocation(location.id);
                    }}
                  />
                </div>
              ))
            ) : (
              <span className="text-gray-500 items-center mt-1.5">
                選擇目的地
              </span>
            )}
          </div>
        </div>
        <button onClick={toggleLocationDropdown}>
          <img
            src="/down.svg"
            className="absolute right-[24px] top-1/2 -translate-y-1/2 cursor-pointer"
          ></img>
        </button>
      </div>
      {/* 位置下拉選單 */}
      {isLocationDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          {/* 位置選擇網格 */}
          <div className="grid grid-cols-3 gap-2 ">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`text-center p-2 rounded-[8px] border cursor-pointer ${
                  selectedLocations.some((loc) => loc.id === location.id)
                    ? "bg-primary text-white border-teal-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => addLocation(location)}
              >
                {location.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
