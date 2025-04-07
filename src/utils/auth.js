import jsSHA from "jssha";

export function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = "411530011-08b1da20-352a-4588";
  let AppKey = "894677d5-0ba6-4ee1-b72a-7eb306926c74";
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
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
  return { Authorization: Authorization, "X-Date": GMTString };
}