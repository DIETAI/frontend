import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import {
  DietKind,
  NewDietKind,
  EditDietKind,
  AllDietKinds,
} from "pages/dashboard/dietKinds";

//components
import PageNav from "components/pageNav/PageNav";

const dietKindsNavLinks = [
  {
    id: 1,
    title: "rodzaje diet",
    path: "/dashboard/admin/dietKinds",
  },
  { id: 2, title: "nowy rodzaj diety", path: "/dashboard/admin/dietKinds/new" },
];

const DietKindsRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav
        headingTitle={"Rodzaje diety"}
        pageNavLinks={dietKindsNavLinks}
      />
      <Routes>
        <Route path="/" element={<AllDietKinds />} />
        <Route path="/new" element={<NewDietKind />} />
        <Route path="/edit/:dietKindId" element={<EditDietKind />} />
        <Route path="/:dietKindId" element={<DietKind />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DietKindsRoutes;
