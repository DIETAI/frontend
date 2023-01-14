import React from "react";
import { useParams } from "react-router";

//styles
import * as Styled from "./MeasurementPage.styles";

//icons
import { FaInfoCircle } from "icons/icons";

//components
import MeasurementContent from "./components/content/MeasurementContent";
import MeasurementSidebar from "./components/sidebar/MeasurementSidebar";
import PageNav from "components/pageNav/PageNav";

import { measurementSidebarSections } from "./components/sidebar/sections";
import { measurementsNavLinks } from "../utlis/navLinks";

const Measurement = () => {
  const { measurementId } = useParams();
  return (
    <>
      <PageNav
        headingTitle={"Pomiary"}
        pageNavLinks={[
          ...measurementsNavLinks,
          {
            id: measurementsNavLinks.length + 1,
            title: "pomiar",
            path: `/dashboard/measurements/${measurementId}`,
          },
        ]}
      />
      <Styled.MeasurementContainer>
        <MeasurementContent />
        <MeasurementSidebar
          title={"Informacje"}
          icon={<FaInfoCircle />}
          sections={measurementSidebarSections}
        />

        {/* Measurement: {measurement.name} */}
      </Styled.MeasurementContainer>
    </>
  );
};

export default Measurement;
