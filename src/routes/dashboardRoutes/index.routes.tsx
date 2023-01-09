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

import { useUser } from "services/useUser";

const Dashboard = () => {
  const { user, userLoading, userError, loggedOut } = useUser();

  console.log({ user });

  if (userLoading) return <PageLoading />;

  if (loggedOut) {
    return <Navigate to="/auth/login" />;
    // return <Navigate to="https://dietai.pl/" />;
  }

  // useEffect(() => {
  //   if(userError) {

  //   }

  // }, [userError])

  // if (!user.role) {
  //   return <Navigate to="/verify/role" />;
  // }

  // if (!user.emailVerified) {
  //   return <Navigate to="/verify/role" />;
  // }

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
