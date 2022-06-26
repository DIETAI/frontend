import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";

import {
  AllMeasurements,
  NewMeasurement,
  EditMeasurement,
  Measurement,
} from "pages/dashboard/measurements";

//components
import PageNav from "components/pageNav/PageNav";

const measurementsNavLinks = [
  { id: 1, title: "wszystkie pomiary", path: "/dashboard/measurements" },
  { id: 2, title: "nowy pomiar", path: "/dashboard/measurements/new" },
];

const MeasurementRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav headingTitle={"Pomiary"} pageNavLinks={measurementsNavLinks} />
      <Routes>
        <Route path="/" element={<AllMeasurements />} />
        <Route path="/:measurementId" element={<Measurement />} />
        <Route path="/new" element={<NewMeasurement />} />
        <Route path="/edit/:measurementEditId" element={<EditMeasurement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MeasurementRoutes;
