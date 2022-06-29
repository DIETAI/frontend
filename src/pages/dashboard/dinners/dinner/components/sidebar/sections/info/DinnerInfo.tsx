import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";

import { getDinner } from "services/getDinners";

//styles
import * as Styled from "./DinnerInfo.styles";

const DinnerInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  return (
    <Styled.DinnerInfoWrapper>
      <Styled.DinnerInfoItem>
        <h2>{t("formOptions.name")}: </h2>
        <p>{dinner.name}</p>
      </Styled.DinnerInfoItem>
      <Styled.DinnerInfoItem>
        <h2>{t("formOptions.created")}: </h2>{" "}
        <p>
          {format(new Date(dinner.createdAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.DinnerInfoItem>
      <Styled.DinnerInfoItem>
        <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
        <p>
          {format(new Date(dinner.updatedAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.DinnerInfoItem>
      <Button
        fullWidth
        onClick={() =>
          navigate(`/dashboard/diet-establishments/edit/${dinner._id}`)
        }
      >
        {t("formOptions.edit")}
      </Button>

      <button>pobierz</button>
    </Styled.DinnerInfoWrapper>
  );
};

export default DinnerInfo;
