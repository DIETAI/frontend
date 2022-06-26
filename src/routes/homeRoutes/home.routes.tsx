import React from "react";
import { Navigate } from "react-router-dom";

const HomeRoutes = () => {
  return <Navigate to="/auth/login" />;
};

export default HomeRoutes;
