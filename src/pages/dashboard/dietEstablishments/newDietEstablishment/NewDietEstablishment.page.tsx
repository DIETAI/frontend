import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

//icon
import { FaCarrot, FaUtensils } from "icons/icons";

//components
import NewDietEstablishmentForm from "./components/DietEstablishmentsForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import DietEstablishmentSidebarSteps from "../components/form/sidebar/steps/DietEstablishmentSidebarSteps";

import { dietEstablishmentsFormSteps } from "../utlis/steps";

const dietEstablishmentSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: (
      <DietEstablishmentSidebarSteps
        dietEstablishmentFormSteps={dietEstablishmentsFormSteps}
      />
    ),
  },
  // { id: 2, title: "anatomia", component: <DinnerSidebarEstablishment /> },
];

const NewDietEstablishment = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const patientIdParam = searchParams.get("patientId"); //from newDiet
  const newDietNameParam = searchParams.get("dietName"); //from newDiet
  const newDietDaysAmountParam = searchParams.get("daysAmount"); //from newDiet

  return (
    <>
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={t("dietEstablishment.sidebar.title")}
          pages={dietEstablishmentSidebarPages}
        />
        <NewDietEstablishmentForm />
      </MultiStepContainer>
    </>
  );
};

export default NewDietEstablishment;
