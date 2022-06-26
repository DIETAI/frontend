import React from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//icon
import { FaCarrot, FaUtensils } from "icons/icons";

//components
import EditDietEstablishmentForm from "./components/EditDietEstablishmentForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import DietEstablishmentSidebarSteps from "../components/form/sidebar/steps/DietEstablishmentSidebarSteps";

//utils
import { dietEstablishmentsFormSteps } from "../utlis/steps";

//queries
import { useDietEstablishment } from "services/useDietEstablishments";

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

const EditDietEstablishment = () => {
  const { t } = useTranslation();

  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading...</div>;
  if (dietEstablishmentError || !dietEstablishment)
    return <div>dietEstablishment error</div>;

  console.log({ dietEstablishment });

  return (
    <>
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={dietEstablishment.name}
          pages={dietEstablishmentSidebarPages}
        />
        <EditDietEstablishmentForm dietEstablishment={dietEstablishment} />
      </MultiStepContainer>
    </>
  );
};

export default EditDietEstablishment;
