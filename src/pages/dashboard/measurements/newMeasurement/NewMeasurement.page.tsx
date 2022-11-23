import React from "react";
import { useTranslation } from "react-i18next";

//icon
import { FaCarrot, FaUtensils } from "icons/icons";

//components
import NewMeasurementForm from "./components/MeasurementForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import MeasurementSidebarSteps from "../components/form/sidebar/steps/MeasurementSidebarSteps";
import PageNav from "components/pageNav/PageNav";

import { measurementFormSteps } from "../utlis/steps";
import { measurementsNavLinks } from "../utlis/navLinks";

const measurementSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: (
      <MeasurementSidebarSteps measurementFormSteps={measurementFormSteps} />
    ),
  },
  // { id: 2, title: "anatomia", component: <DinnerSidebarEstablishment /> },
];

const NewMeasurement = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageNav headingTitle={"Pomiary"} pageNavLinks={measurementsNavLinks} />
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={t("measurement.sidebar.title")}
          pages={measurementSidebarPages}
        />
        <NewMeasurementForm />
      </MultiStepContainer>
    </>
  );
};

export default NewMeasurement;
