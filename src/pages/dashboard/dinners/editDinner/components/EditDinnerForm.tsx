import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useTranslation } from "react-i18next";
import * as Styled from "./EditDinnerForm.styles";
import { useSearchParams } from "react-router-dom";

//icons
import { FaUtensils, FaCubes } from "icons/icons";

//components
import MultiStepFormContent from "../../../components/multiStepFormv2/multiStepContent/MultiStepContent";
import MultiStepContainer from "../../../components/multiStepFormv2/multiStepContainer/MultiStepContainer";
import MultiStepSidebar from "../../../components/multiStepFormv2/multistepSidebar/MultiStepSidebar";
import DinnerSidebarSteps from "../../components/form/sidebar/steps/DinnerSidebarSteps";
import DinnerSidebarEstablishment from "../../components/form/sidebar/establishment/DinnerSidebarEstablishment";
import FormStep from "../../../components/multiStepFormv2/step/Step";
import Button from "components/form/button/Button";

//steps
import { dinnerFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//interfaces
import { IDinnerProps } from "interfaces/dinner/dinner.interfaces";

//schema
import {
  basicInfoSchema,
  dinnerProductsSchema,
} from "../../schema/newDinner.schema";
import { getDiet } from "services/getDiets";

// const allDinnerSchemas = basicInfoSchema.concat(dinnerProductsSchema);
const allDinnerSchemas = basicInfoSchema;
const defaultDinnerValues = allDinnerSchemas.cast({});
type IDinnerValues = typeof defaultDinnerValues;

const dinnerSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: <DinnerSidebarSteps dinnerFormSteps={dinnerFormSteps} />,
  },
  { id: 2, title: "założenia", component: <DinnerSidebarEstablishment /> },
];

const EditDinnerForm = ({ dinner }: IDinnerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dietId = searchParams.get("dietId"); //from newDiet
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleAlert } = useAlert();

  const onDinnerFormSubmit = async (data: IDinnerValues) => {
    console.log("edytowanie posiłku");
    console.log(data);
    try {
      const editDinner = await axios.put(
        `/api/v1/dinners/${dinner._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editDinner });
      handleAlert("success", "Edytowano posiłek");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie posiłku nie powiodło się");
    }
  };

  const dinnerDefaultValues = {
    ...dinner,
    image: dinner.image?._id,
    dietKindsExclude: dinner.dietKindsExclude || [],
  };

  return (
    <MultiStepContainer
      defaultValues={dinnerDefaultValues}
      onSubmitAction={onDinnerFormSubmit}
      validationSchema={allDinnerSchemas}
    >
      <MultiStepSidebar
        icon={<FaUtensils />}
        title={t("dinner.sidebar.title")}
        pages={dinnerSidebarPages}
      />
      <MultiStepFormContent
        itemId={dinner._id}
        itemCreatedAt={dinner.createdAt}
        itemUpdatedAt={dinner.updatedAt}
      >
        {dietId && <BackToDiet dietId={dietId} />}

        {dinnerFormSteps.map((step) => (
          <FormStep
            key={step.id}
            icon={step.icon}
            label={step.title}
            validationSchema={step.validationSchema}
            id={step.sectionId}
            sectionId={step.sectionId}
          >
            {step.stepContent}
          </FormStep>
        ))}
      </MultiStepFormContent>
    </MultiStepContainer>
  );
};

const BackToDiet = ({ dietId }: { dietId: string }) => {
  const { diet, dietError, dietLoading } = getDiet(dietId);
  const navigate = useNavigate();

  if (dietLoading)
    return <Styled.BackToDietWrapper>loading...</Styled.BackToDietWrapper>;
  if (dietError || !diet)
    return <Styled.BackToDietWrapper>error...</Styled.BackToDietWrapper>;

  return (
    <Styled.BackToDietWrapper>
      <Styled.DietNameWrapper>
        <span>
          <FaCubes />
        </span>
        <h2>{diet.name}</h2>
      </Styled.DietNameWrapper>
      <Button onClick={() => navigate(`/dashboard/diets/edit/${dietId}`)}>
        wróć do diety
      </Button>
    </Styled.BackToDietWrapper>
  );
};

export default EditDinnerForm;
