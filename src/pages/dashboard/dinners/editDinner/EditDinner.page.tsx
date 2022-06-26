import React from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getDinner } from "services/getDinners";

//icon
import { FaUtensils } from "icons/icons";

//components
import EditDinnerForm from "./components/EditDinnerForm";
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

const EditDinner = () => {
  const { t } = useTranslation();

  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  console.log({ dinner });

  return (
    <>
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={dinner.name}
          pages={dinnerSidebarPages}
        />
        <EditDinnerForm dinner={dinner} />
      </MultiStepContainer>
    </>
  );
};

export default EditDinner;
