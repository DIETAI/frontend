import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

const Minerals = () => {
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
        label={t("product.form.minerals.zinc")}
        type="number"
        name="zinc.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.phosphorus")}
        type="number"
        name="phosphorus.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.magnesium")}
        type="number"
        name="magnesium.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.copper")}
        type="number"
        name="copper.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.pottasium")}
        type="number"
        name="potassium.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.selenium")}
        type="number"
        name="selenium.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.sodium")}
        type="number"
        name="sodium.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.calcium")}
        type="number"
        name="calcium.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={t("product.form.minerals.iron")}
        type="number"
        name="iron.amount"
        onChange={handleChange}
        controlled
      />
    </>
  );
};

export default Minerals;
