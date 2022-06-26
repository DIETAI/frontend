import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";

import { useMeasurement } from "services/useMeasurements";

//styles
import * as Styled from "./MeasurementInfo.styles";

const MeasurementInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementId);

  if (measurementLoading) return <div>measurement loading...</div>;
  if (measurementError || !measurement) return <div>measurement error</div>;
  return (
    <Styled.MeasurementInfoWrapper>
      <Styled.MeasurementInfoItem>
        <h2>{t("formOptions.name")}: </h2>
        <p>{measurement.name}</p>
      </Styled.MeasurementInfoItem>
      <Styled.MeasurementInfoItem>
        <h2>{t("formOptions.created")}: </h2>{" "}
        <p>
          {format(new Date(measurement.createdAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.MeasurementInfoItem>
      <Styled.MeasurementInfoItem>
        <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
        <p>
          {format(new Date(measurement.updatedAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.MeasurementInfoItem>
      <Button
        fullWidth
        onClick={() =>
          navigate(`/dashboard/measurements/edit/${measurement._id}`)
        }
      >
        {t("formOptions.edit")}
      </Button>

      <button>pobierz</button>
    </Styled.MeasurementInfoWrapper>
  );
};

export default MeasurementInfo;
