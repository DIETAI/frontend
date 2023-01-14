import React from "react";
import { useParams } from "react-router";

//styles
import * as Styled from "./MeasurementContent.styles";
//utils
import * as MeasurementStep from "./steps";

const MeasurementContent = () => {
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;

  return (
    <Styled.MeasurementContentWrapper>
      <MeasurementStep.BasicInfo />
      <MeasurementStep.BasicData />
      <MeasurementStep.AdditionalData />
    </Styled.MeasurementContentWrapper>
  );
};

export default MeasurementContent;
