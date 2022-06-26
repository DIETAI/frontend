import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import AuthLayout from "layout/auth/auth.layout";

//components
import { Login, Register } from "pages/auth";
import NotFound from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

import { useUser } from "services/useUser";

const AuthRoutes = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) return <PageLoading />;
  // if (userError) return <div>error..</div>;

  if (user) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <AuthLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;
