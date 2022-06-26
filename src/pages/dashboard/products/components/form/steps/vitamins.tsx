import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";

const Vitamins = () => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminA")}`}
        type="number"
        name="vitaminA.amount"
        step="0.01"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB1")}`}
        type="number"
        name="vitaminB1.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB2")}`}
        type="number"
        name="vitaminB2.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB3")}`}
        type="number"
        name="vitaminPP.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB5")}`}
        type="number"
        name="vitaminB5.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB6")}`}
        type="number"
        name="vitaminB6.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB7")}`}
        type="number"
        name="biotin.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB9")}`}
        type="number"
        name="folicAcid.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminB12")}`}
        type="number"
        name="vitaminB12.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminC")}`}
        type="number"
        name="vitaminC.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminD")}`}
        type="number"
        name="vitaminD.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminE")}`}
        type="number"
        name="vitaminE.amount"
      />
      <Input
        fullWidth
        label={`${t("product.form.vitamins.vitaminK")}`}
        type="number"
        name="vitaminK.amount"
      />
    </>
  );
};

export default Vitamins;
