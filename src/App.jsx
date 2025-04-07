import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { List } from "./components/List";
import { Foot } from "./components/Foot";
import { Card } from "./components/Card";
import axios from "axios";
import { Spinner } from "./components/Spinner";
import { Foodcard } from "./components/Foodcard";
import { getAuthorizationHeader } from "./utils/auth";

function App() {
  const [travelData, setTravelData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      // 第一個 API 請求
      axios.get(
        "https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON",
        {
          headers: getAuthorizationHeader(),
        }
      ),
      // 第二個 API 請求
      axios.get(
        "https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=30&%24format=JSON",
        {
          headers: getAuthorizationHeader(),
        }
      ),
    ])
      .then(([scenicResponse, foodResponse]) => {
        setTravelData(scenicResponse.data);
        // 設置第二個 API 的資料
        setFoodData(foodResponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("API 請求失敗:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-bg-gray h-full ">
      <Header />
      <div className="lg:ml-[300px]">
        <Hero />
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500 text-center mt-4">
            {error.message || "載入數據時發生錯誤"}
          </div>
        ) : (
          <>
            <List title={"景點推薦"} />
            <div className="card">
              {travelData
                .filter((item) => Object.keys(item.Picture).length !== 0)
                .map((item) => (
                  <Card
                    key={item.ScenicSpotID}
                    scenicSpotName={item.ScenicSpotName}
                    picture={item.Picture.PictureUrl1}
                    address={item.Address}
                  />
                ))}
            </div>
            <List title={"美食品嚐"} />
            <div className="card">
              {foodData.map((item) => (
                <Foodcard
                  key={item.RestaurantID}
                  restaurantName={item.RestaurantName}
                  picture={item.Picture.PictureUrl1}
                  address={item.Address}
                  opentime={item.OpenTime}
                />
              ))}
            </div>
          </>
        )}
        <Foot />
      </div>
    </div>
  );
}

export default App;
