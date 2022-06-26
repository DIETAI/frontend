import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import DashboardLayout from "layout/dashboard/dashboard.layout";

//components
// import PageLoading from "@components/loading/pageLoading/PageLoading";
import DieteticRoutes from "./dietetic/dietetic.routes";
import NotFoundPage from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

// //redux
// import { State } from "@redux/reducers";
// import { useSelector } from "react-redux";

import { useUser } from "services/useUser";

const Dashboard = () => {
  const { user, userLoading, userError } = useUser();

  // const { data } = useSwr<User | null>(
  //   `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/users`,
  //   fetcher,
  //   { fallbackData }
  // );

  console.log({ user });

  if (userLoading) return <PageLoading />;
  // if (userError) return <div>nie udało się pobrać danych użytkownika..</div>;

  if (!user || userError) {
    return <Navigate to="/auth/login" />;
  }

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
        {/* <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="measurements/*" element={<MeasurementRoutes />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
