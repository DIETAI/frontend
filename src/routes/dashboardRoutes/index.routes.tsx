import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import DashboardLayout from "layout/dashboard/dashboard.layout";

//components
// import PageLoading from "@components/loading/pageLoading/PageLoading";
import DieteticRoutes from "./dietetic/dietetic.routes";
import AdminRoutes from "./admin/admin.routes";
import NotFoundPage from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

import { useUser } from "services/user.service";

const Dashboard = () => {
  const { userLoading, loggedOut } = useUser();

  if (userLoading) return <PageLoading />;

  if (loggedOut) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/*" element={<DieteticRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
