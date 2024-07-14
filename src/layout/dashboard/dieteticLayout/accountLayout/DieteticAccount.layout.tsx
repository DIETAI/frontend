import React from "react";
import PageNav from "components/pageNav/PageNav";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";

const accountNavLinks = [
  { id: 1, title: "profil", path: "/dashboard/account" },
  // { id: 2, title: "informacje", path: "/dashboard/informations" },
  // { id: 3, title: "wiadomości", path: "/dashboard/account/messages" },
  // { id: 4, title: "plany", path: "/dashboard/account/plans" },
  // { id: 5, title: "faktury", path: "/dashboard/account/payments" },
];

const DieteticAccountLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageNav
        headingTitle={t("profile.account.heading")}
        pageNavLinks={accountNavLinks}
      />
      <Outlet />
    </>
  );
};

export default DieteticAccountLayout;
