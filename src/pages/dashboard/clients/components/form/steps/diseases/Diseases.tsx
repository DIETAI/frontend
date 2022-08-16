import React from "react";
import { useTranslation } from "react-i18next";

//components
import MultipleAutocomplete from "components/form/multipleAutocomplete/MultipleAutocomplete";

const diseasesOptions = [
  { id: 1, name: "wzdęcia", type: "flatulence" },
  { id: 2, name: "zaparcia", type: "constipation" },
  { id: 3, name: "refluks", type: "reflux" },
  { id: 4, name: "otyłość", type: "obesity" },
  { id: 5, name: "osteoporoza", type: "osteoporosis" },
  { id: 6, name: "dna moczanowa", type: "gout" },
  { id: 7, name: "miażdżyca", type: "atherosclerosis" },
  { id: 8, name: "nadciśnienie tętnicze", type: "hypertension" },
  { id: 9, name: "nowotwór", type: "tumor" },
];

const alergensOptions = [
  { id: 1, name: "orzechy", type: "peanuts" },
  { id: 2, name: "żyto", type: "rye" },
  { id: 3, name: "białko jaja", type: "eggProtein" },
];

const Diseases = () => {
  const { t } = useTranslation();

  return (
    <>
      <MultipleAutocomplete
        name="diseases"
        label={`${t("client.form.diseases.diseases")}`}
        options={diseasesOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />
      <MultipleAutocomplete
        name="alergens"
        label={`${t("client.form.diseases.allergies")}`}
        options={alergensOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />
    </>
  );
};

export default Diseases;
