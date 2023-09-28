import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import NotFoundPage from "pages/information/notFound/notFound.page";
import SubscriptionPlanRoutes from "./subscriptionPlans.routes";
import DietKindRoutes from "./dietKinds.routes";

//swr
import { useUser } from "services/getUser";

const Admin = () => {
  //useSwr checkUserRole = dietetic
  const { user, userLoading, userError } = useUser();

  // if (!user.role || user.role.name !== "dietetic") {
  //   return <Navigate to="/dashboard/profile" />;
  // }

  return (
    <Routes>
      <Route path="subscriptionPlans/*" element={<SubscriptionPlanRoutes />} />
      <Route path="dietKinds/*" element={<DietKindRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Admin;
