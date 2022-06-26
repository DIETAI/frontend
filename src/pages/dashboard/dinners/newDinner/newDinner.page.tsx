import React from "react";
import { useTranslation } from "react-i18next";

//icon
import { FaUtensils } from "icons/icons";

//components
import NewDinnerForm from "./components/DinnerForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import DinnerSidebarSteps from "../components/form/sidebar/steps/DinnerSidebarSteps";
import DinnerSidebarEstablishment from "../components/form/sidebar/establishment/DinnerSidebarEstablishment";

import { dinnerFormSteps } from "../utils/steps";

const dinnerSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: <DinnerSidebarSteps dinnerFormSteps={dinnerFormSteps} />,
  },
  { id: 2, title: "założenia", component: <DinnerSidebarEstablishment /> },
];

const NewDinner = () => {
  const { t } = useTranslation();
  return (
    <>
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={t("dinner.sidebar.title")}
          pages={dinnerSidebarPages}
        />
        <NewDinnerForm />
      </MultiStepContainer>
    </>
  );
};

export default NewDinner;
