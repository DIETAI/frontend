import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layout
import AuthLayout from "layout/auth/auth.layout";

//pages
import SubscriptionPlans from "pages/subscriptionPlans/SubscriptionPlans.page";

//components
import NotFound from "pages/information/notFound/notFound.page";
import PageLoading from "components/loading/PageLoading";

import { useUser } from "services/getUser";

const SubscriptionPlanRoutes = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) return <PageLoading />;
  if (userError) return <div>error..</div>;

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  // if (user.role) {
  //   return <Navigate to="/dashboard/profile" />;
  // }

  // if (!user.role) {
  //   return <Navigate to="/verify/role" />;
  // }

  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<SubscriptionPlans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthLayout>
  );
};

export default SubscriptionPlanRoutes;
