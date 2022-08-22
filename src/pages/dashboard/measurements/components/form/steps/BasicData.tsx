import React, { useEffect } from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import formatDistance from "date-fns/formatDistance";
import differenceInYears from "date-fns/differenceInYears";

//helpers
import { bmiHelper } from "../../../helpers/bmi";
import { ppmHelper } from "../../../helpers/ppm";
import { cpmHelper } from "../../../helpers/cpm";

//components
import Autocomplete from "components/form/autocomplete/Autocomplete";

//services
import { getClient } from "services/getClients";

const palOptions = [
  { id: 1, value: 1.3, type: "niska", description: "niska aktywność fizyczna" },
  { id: 2, value: 1.4, type: "niska", description: "niska aktywność fizyczna" },
  {
    id: 3,
    value: 1.5,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 4,
    value: 1.6,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 5,
    value: 1.7,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 6,
    value: 1.8,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 7,
    value: 1.9,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 8,
    value: 2.0,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 9,
    value: 2.1,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 10,
    value: 2.2,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
];

const BasicData = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const clientId = watch("client") as string;

  //odczytać sex i age z client model
  //obliczyć client age
  const { client, clientLoading, clientError } = getClient(clientId);

  const age =
    client && differenceInYears(new Date(), new Date(client.dateOfBirth));
  const sex = client?.gender;
  const pal = client?.pal;

  console.log({ age, clientBirth: client?.dateOfBirth });

  // const sex = watch("sex");
  // const age = watch("age");
  const weight = watch("weight");
  const height = watch("height");
  // const pal = watch("pal");

  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  useEffect(() => {
    if (sex && age && weight && height && pal) {
      const ppm = ppmHelper(sex, weight, height, age);
      const cpm = cpmHelper(ppm.ppm_harris, pal);
      const bmi = bmiHelper(weight, height);

      setValue("ppmHarris", ppm.ppm_harris);
      setValue("ppmMifflin", ppm.ppm_mifflin);
      setValue("cpm", cpm);
      return setValue("bmi", bmi);
    }

    setValue("ppmHarris", 0);
    setValue("ppmMifflin", 0);
    setValue("cpm", 0);
    return setValue("bmi", 0);
  }, [sex, age, weight, height, pal]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    setValue(e.currentTarget.name, value);
  };

  return (
    <>
      <Input
        label={`${t("measurement.form.basicData.weight")} *`}
        type="number"
        name="weight"
        onChange={handleChange}
        controlled
        fullWidth
      />
      <Input
        label={`${t("measurement.form.basicData.height")} *`}
        type="number"
        name="height"
        onChange={handleChange}
        controlled
        fullWidth
      />

      {/* <Autocomplete
        name="pal"
        fullWidth
        label={`pal *`}
        options={palOptions}
        optionLabel={"value"}
        optionRender={"value"}
      /> */}
      <Input
        label={`${t("measurement.form.basicData.ppmHarris")} *`}
        type="number"
        name="ppmHarris"
        fullWidth
        disabled
      />
      <Input
        label={`${t("measurement.form.basicData.ppmMifflin")} *`}
        type="number"
        name="ppmMifflin"
        fullWidth
        disabled
      />
      <Input
        label={`${t("measurement.form.basicData.cpm")} *`}
        type="number"
        name="cpm"
        fullWidth
        disabled
      />
      <Input
        label={`${t("measurement.form.basicData.bmi")} *`}
        type="number"
        name="bmi"
        fullWidth
        disabled
      />
    </>
  );
};

export default BasicData;
