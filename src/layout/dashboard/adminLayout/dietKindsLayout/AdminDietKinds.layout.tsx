import PageNav from "components/pageNav/PageNav";
import React from "react";
import { Outlet } from "react-router";

const dietKindsNavLinks = [
  {
    id: 1,
    title: "rodzaje diet",
    path: "/dashboard/admin/dietKinds",
  },
  { id: 2, title: "nowy rodzaj diety", path: "/dashboard/admin/dietKinds/new" },
];

const AdminDietKindsLayout = () => {
  return (
    <>
      <PageNav
        headingTitle={"Rodzaje diety"}
        pageNavLinks={dietKindsNavLinks}
      />
      <Outlet />
    </>
  );
};

export default AdminDietKindsLayout;
