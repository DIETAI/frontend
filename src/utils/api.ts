import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:1337",
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337"
      : process.env.REACT_APP_BACKEND_URL,
});

export default instance;
