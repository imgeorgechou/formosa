import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "../components/Card";
import { Foodcard } from "../components/Foodcard";
import { Spinner } from "../components/Spinner";
import { getAuthorizationHeader } from "../utils/auth";
import { Header } from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { Foot } from "../components/Foot";
import { THEME_TYPES } from "../components/Header";

export const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const city = searchParams.get("city");
  const theme = searchParams.get("theme");

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 18;

  const fetchMoreData = async (retryCount = 0) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const skip = page * itemsPerPage;
      let url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/`;

      // 添加延遲以避免頻繁請求
      if (retryCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }

      // 根據主題選擇API端點
      if (theme === THEME_TYPES.FOOD) {
        url += "Restaurant";
      } else {
        url += "ScenicSpot";
      }

      // 添加城市篩選
      if (city) {
        url += `/${city}`;
      }

      url += `?$top=${itemsPerPage}&$skip=${skip}`;

      // 添加關鍵字搜尋
      if (keyword) {
        const searchField =
          theme === THEME_TYPES.FOOD ? "RestaurantName" : "ScenicSpotName";
        const descField = "Description";
        const encodedKeyword = encodeURIComponent(keyword);
        url += `&$filter=contains(${searchField},'${encodedKeyword}') or contains(${descField},'${encodedKeyword}')`;
      }

      url += `&$format=JSON`;

      const response = await axios.get(url, {
        headers: getAuthorizationHeader(),
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("API返回的數據格式不正確");
      }

      const newResults = response.data.filter((item) => item);

      if (newResults.length === 0) {
        setHasMore(false);
        return;
      }

      setResults((prevResults) => [...prevResults, ...newResults]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("載入更多資料失敗:", error);

      // 處理429錯誤，進行重試
      if (error.response?.status === 429 && retryCount < 3) {
        console.log(`重試第${retryCount + 1}次...`);
        return fetchMoreData(retryCount + 1);
      }

      setError(error.message || "載入數據時發生錯誤");
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 重置狀態
    setResults([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    fetchMoreData();
  }, [theme, keyword, city]);

  const getTitle = () => {
    if (keyword) return `搜尋：${keyword}`;
    if (city) return `${city}${theme === THEME_TYPES.FOOD ? "美食" : "景點"}`;
    return theme === THEME_TYPES.FOOD ? "美食品嚐" : "景點推薦";
  };

  return (
    <div>
      <Header />
      <div className="p-4 lg:ml-[300px]">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-[32px] h-[32px] cursor-pointer"
          >
            <img
              src="/back.svg"
              alt="返回"
              className="w-[30px] h-[30px] -mr-3"
            />
          </button>
          <h1 className="text-2xl font-bold">{getTitle()}</h1>
        </div>
        {results.length === 0 && isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-500">沒有找到相關結果</div>
        ) : (
          <InfiniteScroll
            dataLength={results.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spinner />}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-3.5"
          >
            {results.map((item) =>
              theme === THEME_TYPES.FOOD ? (
                <Foodcard
                  key={item.RestaurantID}
                  restaurantID={item.RestaurantID}
                  restaurantName={item.RestaurantName}
                  picture={item.Picture?.PictureUrl1}
                  address={item.Address}
                  opentime={item.OpenTime}
                />
              ) : (
                <Card
                  key={item.ScenicSpotID}
                  id={item.ScenicSpotID}
                  scenicSpotName={item.ScenicSpotName}
                  picture={item.Picture?.PictureUrl1}
                  address={item.Address}
                />
              )
            )}
          </InfiniteScroll>
        )}
      </div>
      <Foot />
    </div>
  );
};
