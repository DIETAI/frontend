import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

const Vitamins = () => {
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
        label={`${t("product.form.vitamins.vitaminA")}`}
        type="number"
        name="vitaminA.amount"
        step="0.01"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB1")}`}
        type="number"
        name="vitaminB1.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB2")}`}
        type="number"
        name="vitaminB2.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB3")}`}
        type="number"
        name="vitaminPP.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB5")}`}
        type="number"
        name="vitaminB5.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB6")}`}
        type="number"
        name="vitaminB6.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB7")}`}
        type="number"
        name="biotin.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB9")}`}
        type="number"
        name="folicAcid.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB12")}`}
        type="number"
        name="vitaminB12.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminC")}`}
        type="number"
        name="vitaminC.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminD")}`}
        type="number"
        name="vitaminD.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminE")}`}
        type="number"
        name="vitaminE.amount"
        onChange={handleChange}
        controlled
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminK")}`}
        type="number"
        name="vitaminK.amount"
        onChange={handleChange}
        controlled
      />
    </>
  );
};

export default Vitamins;
