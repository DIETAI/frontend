import React from "react";

//components
import NewMeasurementForm from "./components/MeasurementForm";
import PageNav from "components/pageNav/PageNav";

import { measurementsNavLinks } from "../utlis/navLinks";

const NewMeasurement = () => {
  return (
    <>
      <PageNav headingTitle={"Pomiary"} pageNavLinks={measurementsNavLinks} />
      <NewMeasurementForm />
    </>
  );
};

export default NewMeasurement;
