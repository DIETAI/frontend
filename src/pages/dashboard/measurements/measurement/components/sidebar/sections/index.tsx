import React from "react";
import MeasurementInfo from "./info/MeasurementInfo";
import MeasurementReport from "./report/MeasurementReport";

export const measurementSidebarSections = [
  { id: 1, title: "dane pomiaru", component: <MeasurementInfo /> },
  {
    id: 2,
    title: "raporty",
    component: <MeasurementReport />,
  },
];
