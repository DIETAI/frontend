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
import * as MeasurementStep from "./steps";

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
      <MeasurementStep.BasicInfo />
      <MeasurementStep.BasicData />
      <MeasurementStep.AdditionalData />
    </Styled.MeasurementContentWrapper>
  );
};

export default MeasurementContent;
