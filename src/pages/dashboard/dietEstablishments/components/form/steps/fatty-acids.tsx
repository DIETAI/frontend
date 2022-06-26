import React from "react";
import Input from "components/form/input/Input";
import { useTranslation } from "react-i18next";

const FattyAcids = () => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        fullWidth
        label={t("dietEstablishment.form.fattyAcids.saturatedFattyAcids")}
        type="number"
        name="saturatedFattyAcids"
      />
      <Input
        fullWidth
        label={t(
          "dietEstablishment.form.fattyAcids.pollyunsaturatedFattyAcids"
        )}
        type="number"
        name="pollyunsaturatedFattyAcids"
      />
      <Input
        fullWidth
        label={t(
          "dietEstablishment.form.fattyAcids.pollyunsaturatedFattyAcidsOmega3"
        )}
        type="number"
        name="pollyunsaturatedFattyAcidsOmega3"
      />
      <Input
        fullWidth
        label={t(
          "dietEstablishment.form.fattyAcids.pollyunsaturatedFattyAcidsOmega6"
        )}
        type="number"
        name="pollyunsaturatedFattyAcidsOmega6"
      />
      <Input
        fullWidth
        label={t("dietEstablishment.form.fattyAcids.monounsaturatedFattyAcids")}
        type="number"
        name="monounsaturatedFattyAcids"
      />
    </>
  );
};

export default FattyAcids;
