import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import {
  SubscriptionPlan,
  NewSubscriptionPlan,
  EditSubscriptionPlan,
  AllSubscriptionPlans,
} from "pages/dashboard/subscriptionPlans";

//components
import PageNav from "components/pageNav/PageNav";

const subscriptionPlansNavLinks = [
  {
    id: 1,
    title: "wszystkie plany",
    path: "/dashboard/admin/subscriptionPlans",
  },
  { id: 2, title: "nowy plan", path: "/dashboard/admin/subscriptionPlans/new" },
];

const SubscriptionPlanRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav
        headingTitle={"Plany"}
        pageNavLinks={subscriptionPlansNavLinks}
      />
      <Routes>
        <Route path="/" element={<AllSubscriptionPlans />} />
        <Route path="/new" element={<NewSubscriptionPlan />} />
        <Route
          path="/edit/:subscriptionPlanId"
          element={<EditSubscriptionPlan />}
        />
        <Route path="/:subscriptionPlanId" element={<SubscriptionPlan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default SubscriptionPlanRoutes;
