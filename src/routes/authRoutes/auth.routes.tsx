import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import AuthLayout from "layout/auth/auth.layout";

//components
import { Login, Register } from "pages/auth";
import NotFound from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

import { useUser } from "services/user.service";

const AuthRoutes = () => {
  const { user, userLoading, loggedOut } = useUser();

  if (userLoading) return <PageLoading />;

  if (user && !loggedOut) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <AuthLayout>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthLayout>
    </Suspense>
  );
};

export default AuthRoutes;
