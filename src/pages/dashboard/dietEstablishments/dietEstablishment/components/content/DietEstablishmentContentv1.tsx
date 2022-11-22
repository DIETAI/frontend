import React, { ReactNode } from "react";
import { useParams } from "react-router";
import { useDietEstablishment } from "services/useDietEstablishments";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./DietEstablishmentContentv1.styles";

//icons
import { FaUtensils, FaWeight } from "icons/icons";

//utils
import {
  dietEstablishmentContentSections,
  DietEstablishmentKeyType,
} from "../../utils/dietEstablishmentSections";

//components
import Image from "components/form/images/image/Image";

//interfaces
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

const DietEstablishmentContent = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading</div>;
  if (!dietEstablishment || dietEstablishmentError)
    return <div>dietEstablishment error</div>;

  const renderContent = (
    key: keyof IDietEstablishmentData,
    label: string,
    type: DietEstablishmentKeyType
  ) => {
    if (type === "string" || type === "number") {
      return (
        <>
          <h2>{label} :</h2> <p>{(dietEstablishment[key] as string) || "-"}</p>
        </>
      );
    }

    if (type === "array" && key === "meals") {
      return (
        <>
          {dietEstablishment[key].map((meal, mealIndex) => (
            <p key={meal.type + mealIndex}>{meal.name}</p>
          ))}
        </>
      );
    }

    if (
      type === "object" &&
      (key === "fat" || key === "carbohydrates" || key === "protein")
    ) {
      return (
        <>
          {label} :{" "}
          <div>
            <p>{dietEstablishment[key].gram} gram</p>
            <p>{dietEstablishment[key].kcal} kcal </p>
            <p>{dietEstablishment[key].procent} procent</p>
          </div>
        </>
      );
    }

    return "-";
  };

  return (
    <Styled.MeasurementContentWrapper>
      {dietEstablishmentContentSections.map((section) => (
        <Styled.MeasurementStepWrapper key={section.id}>
          <Styled.StepHeadingWrapper>
            <Styled.IconWrapper>{section.icon}</Styled.IconWrapper>
            <h2>{section.title}</h2>
          </Styled.StepHeadingWrapper>
          <Styled.MeasurementItemsWrapper>
            {section.keys.map(({ key, label, type }) => (
              <Styled.MeasurementItem key={key}>
                {renderContent(key, label, type)}
              </Styled.MeasurementItem>
            ))}
          </Styled.MeasurementItemsWrapper>
        </Styled.MeasurementStepWrapper>
      ))}
    </Styled.MeasurementContentWrapper>
  );
};

export default DietEstablishmentContent;
