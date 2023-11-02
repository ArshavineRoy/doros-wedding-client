// api config

import axios from "axios";
import { loadToken } from "../token";

const LOGIN_URL = "https://doros-wedding-server.onrender.com/login";
const userToken = await loadToken()

const login = async (userData) => {
  
  const config = {
    headers: {
      "Content-Type": "application/json",
       Authorization:`Bearer ${userToken}`
    },
  };
  try {
    const { data } = await axios.post(LOGIN_URL, userData, config);
    console.log(data);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } 
    return data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.log("=====", err.response.data);
    }
    return { error: "error occured" };
  }
};

const authService = { login };

export default authService;
