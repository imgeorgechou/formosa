import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Foot } from "../components/Foot";
import axios from "axios";
import { getAuthorizationHeader } from "../utils/auth";
import { Spinner } from "../components/Spinner";

export const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      if (!id) {
        setError("無效的ID");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?$filter=RestaurantID eq '${id}'&$format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        );

        if (!response.data) {
          throw new Error("API返回的數據格式不正確");
        }

        if (response.data.length > 0) {
          setRestaurant(response.data[0]);
        } else {
          setError("抱歉，找不到資訊。請確認連結是否正確，或返回首頁。");
        }
      } catch (error) {
        console.error("載入詳細資訊失敗:", error);
        setError("載入資訊時發生錯誤，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  return (
    <>
      <Header />
      <div className="lg:ml-[300px] -mt-4 lg:mt-0">
        <div className="container mx-auto px-10 py-8">
          <div className="flex items-center mb-4 text-black text-2xl font-bold">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center  cursor-pointer"
            >
              <img src="/back.svg" alt="返回" className="w-10 h-10 mr-2" />
            </button>
            {restaurant ? restaurant.RestaurantName : "餐廳詳細資訊"}
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : restaurant ? (
            <div className=" flex flex-col justify-center items-center">
              <img
                src={restaurant.Picture?.PictureUrl1 || "/hero.svg"}
                alt={restaurant.RestaurantName}
                className="w-full h-50 object-cover rounded-[4px] "
              />
              <div className="mt-4 flex flex-col items-center">
                <div className="bg-primary-lighter p-4 w-full mb-5 rounded-xl">
                  <div className="flex items-center mb-4">
                    <img src="/locate.svg" alt="" className="w-5 h-5 mr-2" />
                    <p className="text-gray-600">{restaurant.Address}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <img src="/time.svg" alt="" className="w-5 h-5 mr-2" />
                    <p className="text-gray-600">
                      {restaurant.OpenTime || "無開放時間資訊"}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <img src="/call.svg" alt="" className="w-5 h-5 mr-2" />
                    <p className="text-gray-600">
                      {restaurant.Phone || "無聯絡方式"}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-primary mb-2">
                    餐廳介紹
                  </h2>
                  <p className="text-gray-700">
                    {restaurant.Description || "無詳細介紹"}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <Foot />
      </div>
    </>
  );
};
