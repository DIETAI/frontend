import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

const FattyAcids = () => {
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { t } = useTranslation();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    console.log({ name: e.currentTarget.name, value: value });

    // if (!value) return setValue(e.currentTarget.name, 0);

    setValue(e.currentTarget.name, value);
  };
  return (
    <>
      <Input
        fullWidth
        label={t("product.form.fattyAcids.saturatedFattyAcids")}
        type="number"
        name="saturatedFattyAcids"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.fattyAcids.pollyunsaturatedFattyAcids")}
        type="number"
        name="pollyunsaturatedFattyAcids"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.fattyAcids.pollyunsaturatedFattyAcidsOmega3")}
        type="number"
        name="pollyunsaturatedFattyAcidsOmega3"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.fattyAcids.pollyunsaturatedFattyAcidsOmega6")}
        type="number"
        name="pollyunsaturatedFattyAcidsOmega6"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.fattyAcids.monounsaturatedFattyAcids")}
        type="number"
        name="monounsaturatedFattyAcids"
        onChange={handleChange}
        controlled
      />
    </>
  );
};

export default FattyAcids;
