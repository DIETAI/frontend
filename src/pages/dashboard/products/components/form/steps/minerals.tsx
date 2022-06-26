import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";

const Minerals = () => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        fullWidth
        label={t("product.form.minerals.zinc")}
        type="number"
        name="zinc.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.phosphorus")}
        type="number"
        name="phosphorus.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.magnesium")}
        type="number"
        name="magnesium.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.copper")}
        type="number"
        name="copper.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.pottasium")}
        type="number"
        name="potassium.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.selenium")}
        type="number"
        name="selenium.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.sodium")}
        type="number"
        name="sodium.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.calcium")}
        type="number"
        name="calcium.amount"
      />
      <Input
        fullWidth
        label={t("product.form.minerals.iron")}
        type="number"
        name="iron.amount"
      />
    </>
  );
};

export default Minerals;
