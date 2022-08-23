import React from "react";

import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";
import { useMeasurements } from "services/useMeasurements";

//queries
import { getClients } from "services/getClients";

//components
import Autocomplete from "components/form/autocomplete/Autocomplete";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import CheckBox from "components/checkbox/CheckboxWrapper";

//assets
import NoDataImg from "assets/noData.svg";

//styles
import * as Styled from "./BasicInfo.styles";

//form
import { useFormContext } from "react-hook-form";
import Button from "components/form/button/Button";

const BasicInfo = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { measurements, measurementsLoading, measurementsError } =
    useMeasurements();

  const { t } = useTranslation();
  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  const clientMeasurementCpm = watch("clientMeasurementCpm") as boolean;
  const client = watch("client") as string;

  const { clients, clientsError, clientsLoading } = getClients();

  if (measurementsLoading) return <div>measurements loading</div>;
  if (measurementsError || !measurements) return <div>measurements error</div>;

  if (clientsLoading) return <div>clients loading</div>;
  if (clientsError) return <div>clients error</div>;

  //getClientMeasurements

  const clientMeasurements = measurements.filter(
    (measurement) => measurement.client === client
  );

  const measurementsOptions = clientMeasurements?.map((measurement) => ({
    _id: measurement._id,
    name: `${measurement.name} - ${measurement.cpm} kcal`,
  }));

  const handleClientMeasurementCpm = (open: boolean) => {
    setValue("clientMeasurementCpm", open);
    setValue("kcal", 0);
  };

  return (
    <>
      <Input
        label={`${t("dietEstablishment.form.basic_info.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Input
        label={`${t("dietEstablishment.form.basic_info.description")}`}
        type="text"
        name="description"
        fullWidth
        textarea
      />
      <Autocomplete
        name="client"
        fullWidth
        label={`${t("dietEstablishment.form.basic_info.client")} *`}
        options={clients as []}
        optionLabel={"name"}
        optionRender={"_id"}
      />
      <Styled.CheckBoxContainer>
        <Styled.CheckBoxWrapper>
          <CheckBox
            onClick={() => handleClientMeasurementCpm(true)}
            checked={clientMeasurementCpm}
          />
          <p>pobierz kcal z pomiaru pacjenta</p>
        </Styled.CheckBoxWrapper>
        <Styled.CheckBoxWrapper>
          <CheckBox
            onClick={() => handleClientMeasurementCpm(false)}
            checked={!clientMeasurementCpm}
          />
          <p>wpisz kcal</p>
        </Styled.CheckBoxWrapper>
      </Styled.CheckBoxContainer>

      {clientMeasurementCpm && (
        <>
          {!client ? (
            <Styled.NoMeasurementWrapper>
              <img src={NoDataImg} />
              <h3>dodaj pacjenta</h3>
            </Styled.NoMeasurementWrapper>
          ) : (
            <>
              {clientMeasurements.length > 0 ? (
                <>
                  <Autocomplete
                    name="measurementId"
                    fullWidth
                    label={`${t(
                      "dietEstablishment.form.basic_info.measurementId"
                    )} *`}
                    options={measurementsOptions as []}
                    optionLabel={"name"}
                    optionRender={"_id"}
                  />
                  <Input
                    label={`${t("dietEstablishment.form.basic_info.kcal")} *`}
                    type="number"
                    name="kcal"
                    fullWidth
                  />
                </>
              ) : (
                <Styled.NoMeasurementWrapper>
                  <img src={NoDataImg} />
                  <h3>brak pomiarów pacjenta</h3>
                  {/* <Button
                    variant="primary"
                    type="button"
                    onClick={() => console.log("hello")}
                  >
                    dodaj pomiar
                  </Button> */}
                </Styled.NoMeasurementWrapper>
              )}
            </>
          )}
        </>
      )}

      {!clientMeasurementCpm && (
        <>
          <Input
            label={`${t("dietEstablishment.form.basic_info.kcal")} *`}
            type="number"
            name="kcal"
            fullWidth
          />
        </>
      )}

      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dietEstablishment.form.basic_info.dietKind")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
    </>
  );
};

export default BasicInfo;
