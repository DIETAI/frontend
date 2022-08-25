import React, { ReactNode } from "react";
import { useParams } from "react-router";
import { useMeasurement } from "services/useMeasurements";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./MeasurementContent.styles";

//icons
import { FaUtensils, FaWeight } from "icons/icons";

//utils
import { measurementContentSections } from "../../utils/measurementSections";

//components
import Image from "components/form/images/image/Image";

//interfaces
import { IMeasurementData } from "interfaces/measurement.interfaces";

const MeasurementContent = () => {
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;

  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementId);

  if (measurementLoading) return <div>measurement loading</div>;
  if (!measurement || measurementError) return <div>measurement error</div>;

  console.log({ measurement });

  const imagesList = (images: string[] | undefined) => {
    if (!images)
      return (
        <>
          <h2>zdjęcia :</h2> <p>-</p>
        </>
      );
    return images.map((image) => <Image key={image} imageId={image} />);
  };

  const renderGender = (sex: IMeasurementData["sex"]) => {
    if (sex === "male") return "mężczyzna";

    return "kobieta";
  };

  const dateFormat = (date: string) => {
    const formatDate = format(new Date(date), "dd.MM.yyyy", {
      locale: pl,
    });

    return formatDate;
  };

  return (
    <Styled.MeasurementContentWrapper>
      <Styled.MeasurementStepWrapper>
        <Styled.StepHeadingWrapper>
          <Styled.IconWrapper>
            <FaWeight />
          </Styled.IconWrapper>
          <h2>{measurement.name}</h2>
        </Styled.StepHeadingWrapper>
        <Styled.MeasurementBoxWrapper>
          <Styled.MeasurementInfoBox>
            <h2>cpm (kcal): </h2>
            <h3>{measurement.cpm}</h3>
          </Styled.MeasurementInfoBox>
          <Styled.MeasurementInfoBox>
            <h2>masa ciała (kg): </h2>
            <h3>{measurement.weight}</h3>
          </Styled.MeasurementInfoBox>
          <Styled.MeasurementInfoBox>
            <h2>bmi (m/kg2): </h2>
            <h3>{measurement.bmi}</h3>
          </Styled.MeasurementInfoBox>
        </Styled.MeasurementBoxWrapper>
      </Styled.MeasurementStepWrapper>
      {measurementContentSections.map((section) => (
        <Styled.MeasurementStepWrapper key={section.id}>
          <Styled.StepHeadingWrapper>
            <Styled.IconWrapper>{section.icon}</Styled.IconWrapper>
            <h2>{section.title}</h2>
          </Styled.StepHeadingWrapper>
          {/* <Styled.MeasurementItemsWrapper>
            {section.keys.map(({ key, label, type }) => (
              <Styled.MeasurementItem key={key}>
                {key === "sex" && (
                  <>
                    <h2>{label} :</h2>{" "}
                    <p>
                      {renderGender(
                        measurement[key] as IMeasurementData["sex"]
                      )}
                    </p>
                  </>
                )}
                {type === "images" && imagesList(measurement[key] as string[])}
                {type === "date" && (
                  <>
                    <h2>{label} :</h2>{" "}
                    <p>{dateFormat(measurement[key] as string)}</p>
                  </>
                )}
                {(type === "string" || type === "number") && key !== "sex" && (
                  <>
                    <h2>{label} :</h2> <p>{measurement[key] || "-"}</p>
                  </>
                )}
              </Styled.MeasurementItem>
            ))}
          </Styled.MeasurementItemsWrapper> */}

          {/* {JSON.stringify(measurement)} */}
        </Styled.MeasurementStepWrapper>
      ))}
    </Styled.MeasurementContentWrapper>
  );
};

export default MeasurementContent;
