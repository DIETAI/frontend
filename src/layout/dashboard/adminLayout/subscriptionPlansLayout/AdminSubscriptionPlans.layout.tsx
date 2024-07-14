import PageNav from "components/pageNav/PageNav";
import React from "react";
import { Outlet } from "react-router";

const subscriptionPlansNavLinks = [
  {
    id: 1,
    title: "wszystkie plany",
    path: "/dashboard/admin/subscriptionPlans",
  },
  { id: 2, title: "nowy plan", path: "/dashboard/admin/subscriptionPlans/new" },
];

const AdminSubscriptionPlansLayout = () => {
  return (
    <>
      <PageNav
        headingTitle={"Plany"}
        pageNavLinks={subscriptionPlansNavLinks}
      />
      <Outlet />
    </>
  );
};

export default AdminSubscriptionPlansLayout;
