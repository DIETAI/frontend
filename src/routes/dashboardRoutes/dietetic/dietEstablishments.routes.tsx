import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import {
  AllDietEstablishments,
  NewDietEstablishment,
  EditDietEstablishment,
  DietEstablishment,
} from "pages/dashboard/dietEstablishments";

//components
import PageNav from "components/pageNav/PageNav";

const dietEstablishmentsNavLinks = [
  {
    id: 1,
    title: "wszystkie założenia",
    path: "/dashboard/diet-establishments",
  },
  {
    id: 2,
    title: "nowe założenia",
    path: "/dashboard/diet-establishments/new",
  },
];

const DietEstablishmentRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav
        headingTitle={"Założenia żywieniowe"}
        pageNavLinks={dietEstablishmentsNavLinks}
      />
      <Routes>
        <Route path="/" element={<AllDietEstablishments />} />
        <Route path="/:dietEstablishmentId" element={<DietEstablishment />} />
        <Route path="/new" element={<NewDietEstablishment />} />
        <Route
          path="/edit/:dietEstablishmentId"
          element={<EditDietEstablishment />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DietEstablishmentRoutes;
