import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:1337",
  baseURL: baseURL,

  // baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;
