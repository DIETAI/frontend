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
import ClientSidebarSteps from "../../components/form/sidebar/steps/ClientSidebarSteps";
import FormStep from "../../../components/multiStepFormv2/step/Step";

//steps
import { clientFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  clientBasicInfoSchema,
  clientDiseasesSchema,
  clientAimsSchema,
  clientNutritionalInterviewSchema,
} from "../../schema/newClient.schema";

// const allDinnerSchemas = basicInfoSchema.concat(dinnerProductsSchema);
const allClientSchemas = clientBasicInfoSchema
  .concat(clientDiseasesSchema)
  .concat(clientAimsSchema)
  .concat(clientNutritionalInterviewSchema);

const defaultClientValues = allClientSchemas.cast({});
type IClientValues = typeof defaultClientValues;

const clientSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: <ClientSidebarSteps clientFormSteps={clientFormSteps} />,
  },
];

const NewClientForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleAlert } = useAlert();

  const onClientFormSubmit = async (data: IClientValues) => {
    console.log("dodawanie pacjenta");
    console.log(data);
    try {
      const newClient = await axios.post(`/api/v1/clients`, data, {
        withCredentials: true,
      });
      console.log({ newClient });
      handleAlert("success", "Dodano pacjenta");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie pacjenta nie powiodło się");
    }
  };

  return (
    <MultiStepContainer
      defaultValues={defaultClientValues}
      onSubmitAction={onClientFormSubmit}
      validationSchema={allClientSchemas}
    >
      <MultiStepSidebar
        icon={<FaUtensils />}
        title={t("client.sidebar.title")}
        pages={clientSidebarPages}
      />
      <MultiStepFormContent>
        {clientFormSteps.map((step) => (
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

export default NewClientForm;
