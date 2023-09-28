import React from "react";
import * as StepStyled from "../../MeasurementContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaWeightHanging, FaWeight } from "icons/icons";

//components
import LoadingGrid from "../../../loading/LoadingGrid";
import { getMeasurement } from "services/getMeasurements";

const BasicData = () => {
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    getMeasurement(measurementId);

  if (measurementError) return <div>Measurement error</div>;

  return (
    <StepStyled.MeasurementStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaWeight />
        </StepStyled.IconWrapper>
        <h2>Podstawowe dane pomiaru</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.MeasurementStepContentContainer>
        <AnimatePresence>
          {measurementLoading && (
            <StepStyled.MeasurementLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.MeasurementLoadingWrapper>
          )}
        </AnimatePresence>
        {measurement && (
          <StepStyled.MeasurementStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <StepStyled.MeasurementItemsWrapper>
              <StepStyled.MeasurementItem>
                <h2>masa ciała (kg): </h2>
                <p>{measurement.weight}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>wysokość ciała (cm): </h2>
                <p>{measurement.height}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>ppm (harris-benedict) [kcal]: </h2>
                <p>{measurement.ppmHarris}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>ppm (mifflin) [kcal]: </h2>
                <p>{measurement.ppmMifflin}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>cpm [kcal]: </h2>
                <p>{measurement.cpm}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>bmi: </h2>
                <p>{measurement.bmi}</p>
              </StepStyled.MeasurementItem>
            </StepStyled.MeasurementItemsWrapper>
          </StepStyled.MeasurementStepContentWrapper>
        )}
      </StepStyled.MeasurementStepContentContainer>
    </StepStyled.MeasurementStepWrapper>
  );
};

export default BasicData;
