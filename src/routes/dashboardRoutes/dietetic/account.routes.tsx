import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import { Profile, Payments, Messages, Plans } from "pages/dashboard/account";
import { useTranslation } from "react-i18next";

//components
import PageNav from "components/pageNav/PageNav";

const accountNavLinks = [
  { id: 1, title: "profil", path: "/dashboard/account" },
  { id: 2, title: "wiadomości", path: "/dashboard/account/messages" },
  { id: 3, title: "plany", path: "/dashboard/account/plans" },
  { id: 4, title: "faktury", path: "/dashboard/account/payments" },
];

const AccountRoutes = () => {
  const { t } = useTranslation();
  //useSwr check userRole
  return (
    <>
      <PageNav
        headingTitle={t("profile.account.heading")}
        pageNavLinks={accountNavLinks}
      />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AccountRoutes;
