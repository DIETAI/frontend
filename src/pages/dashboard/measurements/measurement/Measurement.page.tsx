import React from "react";
import { useParams } from "react-router";
import { useMeasurement } from "services/useMeasurements";

//styles
import * as Styled from "./MeasurementPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import MeasurementContent from "./components/content/MeasurementContent";
import MeasurementSidebar from "./components/sidebar/MeasurementSidebar";
import { measurementSidebarSections } from "./components/sidebar/sections";

const Measurement = () => {
  // const { measurementId } = useParams();
  // console.log({ measurementId });

  // if (!measurementId) return <div>not found</div>;
  // const { measurement, measurementError, measurementLoading } =
  //   useMeasurement(measurementId);

  // if (measurementLoading) return <div>measurement loading...</div>;
  // if (measurementError || !measurement) return <div>measurement error</div>;
  return (
    <Styled.MeasurementContainer>
      <MeasurementContent />
      <MeasurementSidebar
        title={"Informacje"}
        icon={<FaUtensils />}
        sections={measurementSidebarSections}
      />

      {/* Measurement: {measurement.name} */}
    </Styled.MeasurementContainer>
  );
};

export default Measurement;
