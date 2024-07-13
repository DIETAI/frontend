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
import { useMeasurement } from "services/measurement.service";

const AdditionalData = () => {
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementId);

  if (measurementError) return <div>Measurement error</div>;

  return (
    <StepStyled.MeasurementStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaWeightHanging />
        </StepStyled.IconWrapper>
        <h2>Dodatkowe dane pomiaru</h2>
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
                <h2>obwód klatki piersiowej we wdechu (cm): </h2>
                <p>{measurement.chest_breath || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód klatki piersiowej w wydechu (cm): </h2>
                <p>{measurement.chest_exhaust || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód ramienia (cm): </h2>
                <p>{measurement.shoulder || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód ramienia w napięciu (cm): </h2>
                <p>{measurement.shoulder_tonus || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód talii (cm): </h2>
                <p>{measurement.waist || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód bioder (cm): </h2>
                <p>{measurement.hip || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód przedramienia (cm): </h2>
                <p>{measurement.forearm || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód uda (cm): </h2>
                <p>{measurement.thigh || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>obwód łydki (cm): </h2>
                <p>{measurement.calf || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>grubość fałdu skórno-tłuszczowego nad bicepsem (cm): </h2>
                <p>{measurement.biceps || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>grubość fałdu skórno-tłuszczowego nad tricepsem (cm): </h2>
                <p>{measurement.triceps || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>
                  grubość fałdu skórno-tłuszczowego pod dolnym kątem łopatki
                  (cm):{" "}
                </h2>
                <p>{measurement.shoulder_blade || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>
                  grubość fałdu skórno-tłuszczowego nad talerzem biodrowym (cm):{" "}
                </h2>
                <p>{measurement.ala_of_ilium || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>
                  grubość fałdu skórno-tłuszczowego nad kolcem biodrowym
                  przednim górnym (cm):{" "}
                </h2>
                <p>{measurement.iliac_spine || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>wskaźnik WHtR talia/wzrost:</h2>
                <p>{measurement.whtr || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>wskaźnik WHR talia/biodra:</h2>
                <p>{measurement.whr || "-"}</p>
              </StepStyled.MeasurementItem>
              <StepStyled.MeasurementItem>
                <h2>procentowa zawartość tkanki tłuszczowej YMCA:</h2>
                <p>{measurement.ymca || "-"}</p>
              </StepStyled.MeasurementItem>
            </StepStyled.MeasurementItemsWrapper>
          </StepStyled.MeasurementStepContentWrapper>
        )}
      </StepStyled.MeasurementStepContentContainer>
    </StepStyled.MeasurementStepWrapper>
  );
};

export default AdditionalData;
