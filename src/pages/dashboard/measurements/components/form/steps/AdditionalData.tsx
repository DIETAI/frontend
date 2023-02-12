import React, { useEffect } from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { WHRHelper, WHtRHelper } from "../../../helpers/whr";
import { YMCAHelper } from "../../../helpers/ymca";

const AdditionalData = () => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  const sex = watch("sex");
  const weight = watch("weight");
  const height = watch("height");
  const waist = watch("waist");
  const hip = watch("hip");

  useEffect(() => {
    if (waist && height) {
      const whtr = WHtRHelper(waist, height);
      return setValue("whtr", whtr);
    }

    return setValue("whtr", undefined);
  }, [waist, height]);

  useEffect(() => {
    if (waist && hip) {
      const whr = WHRHelper(waist, hip);
      return setValue("whr", whr);
    }

    return setValue("whr", undefined);
  }, [waist, hip]);

  useEffect(() => {
    if (waist && weight && sex) {
      const ymca = YMCAHelper(waist, weight, sex);
      return setValue("ymca", ymca);
    }

    return setValue("ymca", undefined);
  }, [waist, weight, sex]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    setValue(e.currentTarget.name, value);
  };

  return (
    <>
      <Input
        label={`${t("measurement.form.additionalData.chest_breath")}`}
        type="number"
        name="chest_breath"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.chest_exhaust")}`}
        type="number"
        name="chest_exhaust"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.shoulder")}`}
        type="number"
        name="shoulder"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.shoulder_tonus")}`}
        type="number"
        name="shoulder_tonus"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.waist")}`}
        type="number"
        name="waist"
        fullWidth
        controlled
        onChange={handleChange}
      />
      <Input
        label={`${t("measurement.form.additionalData.hip")}`}
        type="number"
        name="hip"
        fullWidth
        controlled
        onChange={handleChange}
      />
      <Input
        label={`${t("measurement.form.additionalData.forearm")}`}
        type="number"
        name="forearm"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.thigh")}`}
        type="number"
        name="thigh"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.calf")}`}
        type="number"
        name="calf"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.biceps")}`}
        type="number"
        name="biceps"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.triceps")}`}
        type="number"
        name="triceps"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.shoulder_blade")}`}
        type="number"
        name="shoulder_blade"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.ala_of_ilium")}`}
        type="number"
        name="ala_of_ilium"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.iliac_spine")}`}
        type="number"
        name="iliac_spine"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.additionalData.whtr")}`}
        type="number"
        name="whtr"
        fullWidth
        disabled
      />
      <Input
        label={`${t("measurement.form.additionalData.whr")}`}
        type="number"
        name="whr"
        fullWidth
        disabled
      />
      <Input
        label={`${t("measurement.form.additionalData.ymca")}`}
        type="number"
        name="ymca"
        fullWidth
        disabled
      />
    </>
  );
};

export default AdditionalData;
