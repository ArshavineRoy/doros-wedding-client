import Cookies from "js-cookie";

// set tokens in cookies

export const setTokensInCookies = (accessToken, refreshToken) => {
  Cookies.set("access_token", accessToken, { expires: 7 });
  Cookies.set("refresh_token", refreshToken);
};

export const getTokensInCookies = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  return { accessToken, refreshToken };
};
