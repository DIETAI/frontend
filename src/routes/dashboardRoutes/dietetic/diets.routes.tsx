import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import { AllDiets, NewDiet, EditDiet, Diet } from "pages/dashboard/diets";

//components
import PageNav from "components/pageNav/PageNav";

const dietsNavLinks = [
  { id: 1, title: "wszystkie diety", path: "/dashboard/diets" },
  { id: 2, title: "nowa dieta", path: "/dashboard/diets/new" },
];

const DietRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav headingTitle={"Diety"} pageNavLinks={dietsNavLinks} />
      <Routes>
        <Route path="/" element={<AllDiets />} />
        <Route path="/:dietId" element={<Diet />} />
        <Route path="/new" element={<NewDiet />} />
        <Route path="/edit/:dietEditId" element={<EditDiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DietRoutes;
