import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";

import { useDietEstablishment } from "services/useDietEstablishments";

//styles
import * as Styled from "./DietEstablishmentInfo.styles";

const DietEstablishmentInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading...</div>;
  if (dietEstablishmentError || !dietEstablishment)
    return <div>dietEstablishment error</div>;

  return (
    <Styled.DietEstablishmentInfoWrapper>
      <Styled.DietEstablishmentInfoItem>
        <h2>{t("formOptions.name")}: </h2>
        <p>{dietEstablishment.name}</p>
      </Styled.DietEstablishmentInfoItem>
      <Styled.DietEstablishmentInfoItem>
        <h2>{t("formOptions.created")}: </h2>{" "}
        <p>
          {format(new Date(dietEstablishment.createdAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.DietEstablishmentInfoItem>
      <Styled.DietEstablishmentInfoItem>
        <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
        <p>
          {format(new Date(dietEstablishment.updatedAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.DietEstablishmentInfoItem>
      <Button
        fullWidth
        onClick={() =>
          navigate(
            `/dashboard/diet-establishments/edit/${dietEstablishment._id}`
          )
        }
      >
        {t("formOptions.edit")}
      </Button>

      <button>pobierz</button>
    </Styled.DietEstablishmentInfoWrapper>
  );
};

export default DietEstablishmentInfo;
