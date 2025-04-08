import jsSHA from "jssha";

let cachedAuth = null;
let tokenExpireTime = null;
const TOKEN_VALIDITY_HOURS = 23; // Token有效期設為23小時，確保在24小時期限前更新

export function getAuthorizationHeader() {
  const now = new Date();

  // 如果已有快取的Token且未過期，直接返回
  if (cachedAuth && tokenExpireTime && now < tokenExpireTime) {
    return cachedAuth;
  }

  // 生成新的Token
  let AppID = import.meta.env.VITE_APP_ID;
  let AppKey = import.meta.env.VITE_APP_KEY;

  let GMTString = now.toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  // 更新快取和過期時間
  cachedAuth = { Authorization: Authorization, "X-Date": GMTString };
  tokenExpireTime = new Date(
    now.getTime() + TOKEN_VALIDITY_HOURS * 60 * 60 * 1000
  );

  return cachedAuth;
}
