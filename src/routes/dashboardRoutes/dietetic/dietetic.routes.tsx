import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import NotFoundPage from "pages/information/notFound/notFound.page";
import ProductRoutes from "./products.routes";
import DinnerRoutes from "./dinners.routes";
import AccountRoutes from "./account.routes";
import HomeRoutes from "./home.routes";
import MeasurementRoutes from "./measurements.routes";
import DietEstablishmentRoutes from "./dietEstablishments.routes";
import DietRoutes from "./diets.routes";
import ClientRoutes from "./clients.routes";

const Dietetic = () => {
  //useSwr checkUserRole = dietetic

  // if (!user.role || user.role.name !== "dietetic") {
  //   return <Navigate to="/dashboard/profile" />;
  // }

  return (
    <Routes>
      <Route path="home/*" element={<HomeRoutes />} />
      <Route path="account/*" element={<AccountRoutes />} />
      <Route path="products/*" element={<ProductRoutes />} />
      <Route path="clients/*" element={<ClientRoutes />} />
      <Route path="dinners/*" element={<DinnerRoutes />} />
      <Route path="measurements/*" element={<MeasurementRoutes />} />
      <Route
        path="diet-establishments/*"
        element={<DietEstablishmentRoutes />}
      />
      <Route path="diets/*" element={<DietRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Dietetic;
