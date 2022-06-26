import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import AuthLayout from "layout/auth/auth.layout";

//pages
import EmailVerify from "pages/verify/email/emailVerify.page";
import EmailSuccessVerify from "pages/verify/email/emailSuccess.page";
import RoleVerify from "pages/verify/role/roleVerify.page";

//components
import NotFound from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

import { useUser } from "services/useUser";

const VerifyRoutes = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) return <PageLoading />;
  if (userError) return <div>error..</div>;

  // if (user.role) {
  //   return <Navigate to="/dashboard/profile" />;
  // }

  // if (!user.role) {
  //   return <Navigate to="/verify/role" />;
  // }

  return (
    <AuthLayout>
      <Routes>
        <Route path="email" element={<EmailVerify />} />
        <Route path="email-success" element={<EmailSuccessVerify />} />
        <Route path="role" element={<RoleVerify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthLayout>
  );
};

export default VerifyRoutes;
