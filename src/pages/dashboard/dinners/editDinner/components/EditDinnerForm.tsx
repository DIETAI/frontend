import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useTranslation } from "react-i18next";

//icons
import { FaUtensils } from "icons/icons";

//components
import MultiStepFormContent from "../../../components/multiStepFormv2/multiStepContent/MultiStepContent";
import MultiStepContainer from "../../../components/multiStepFormv2/multiStepContainer/MultiStepContainer";
import MultiStepSidebar from "../../../components/multiStepFormv2/multistepSidebar/MultiStepSidebar";
import DinnerSidebarSteps from "../../components/form/sidebar/steps/DinnerSidebarSteps";
import DinnerSidebarEstablishment from "../../components/form/sidebar/establishment/DinnerSidebarEstablishment";
import FormStep from "../../../components/multiStepFormv2/step/Step";

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

export default EditDinnerForm;
