import React from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import MultipleAutocomplete from "components/form/multipleAutocomplete/MultipleAutocomplete";

export const aimsOptions = [
  { id: 1, name: "poprawa samopoczucia", type: "improvedWellBeing" },
  { id: 2, name: "poprawa jakości snu", type: "improvedQualityOfSleep" },
  {
    id: 3,
    name: "poprawa nawyków żywieniowych",
    type: "improvedEatingHabits",
  },
  {
    id: 4,
    name: "poprawa wyników sportowych",
    type: "improvedSportPerformance",
  },
  { id: 5, name: "poprawa regeneracji", type: "improvedRegeneration" },
  { id: 6, name: "ograniczenie używek", type: "restrictionOfStimulants" },
];

const Aims = () => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        type="text"
        name="expectedBodyWeight"
        label={`${t("client.form.aims.expectedBodyWeight")}`}
        fullWidth
      />
      <MultipleAutocomplete
        name="specificAims"
        label={`${t("client.form.aims.specificAims")} *`}
        options={aimsOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />
    </>
  );
};

export default Aims;
