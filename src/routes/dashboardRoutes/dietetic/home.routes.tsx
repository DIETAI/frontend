import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import Home from "pages/dashboard/home/Home.page";

const HomeRoutes = () => {
  //useSwr check userRole
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default HomeRoutes;
