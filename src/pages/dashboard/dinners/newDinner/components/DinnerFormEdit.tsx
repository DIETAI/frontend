import React, { useEffect } from "react";

import axios from "utils/api";
import { useNavigate } from "react-router";
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

//schema
import {
  basicInfoSchema,
  dinnerProductsSchema,
} from "../../schema/newDinner.schema";

const allDinnerSchemas = basicInfoSchema.concat(dinnerProductsSchema);
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

const DinnerForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onDinnerFormSubmit = async (data: IDinnerValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie posiłku");
    console.log(data);

    try {
      const newDinner = await axios.post("/api/v1/dinners", data, {
        withCredentials: true,
      });
      console.log({ newDinner });
      handleAlert("success", "Dodano nowy posiłek");
      navigate(`/dashboard/dinners/edit/${newDinner.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie posiłku nie powiodło się");
    }
  };

  return (
    <MultiStepContainer
      defaultValues={defaultDinnerValues}
      onSubmitAction={onDinnerFormSubmit}
      validationSchema={allDinnerSchemas}
    >
      <MultiStepSidebar
        icon={<FaUtensils />}
        title={t("dinner.sidebar.title")}
        pages={dinnerSidebarPages}
      />
      <MultiStepFormContent>
        {dinnerFormSteps.map((step) => (
          <FormStep
            key={step.id}
            icon={step.icon}
            label={step.title}
            validationSchema={step.validationSchema as any}
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

export default DinnerForm;
