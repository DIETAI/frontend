import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useTranslation } from "react-i18next";

//icons
import { FaUser } from "icons/icons";

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

//interfaces
import { IClientProps } from "interfaces/client.interfaces";

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

const EditClientForm = ({ client }: IClientProps) => {
  const { t } = useTranslation();
  const { handleAlert } = useAlert();

  const onClientFormSubmit = async (data: IClientValues) => {
    console.log("edytowanie pacjenta");
    console.log(data);
    try {
      const editClient = await axios.put(
        `/api/v1/clients/${client._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editClient });
      handleAlert("success", "Edytowano pacjenta");
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie pacjenta nie powiodło się");
    }
  };

  const clientDefaultValues = {
    ...client,
  };

  return (
    <MultiStepContainer
      defaultValues={clientDefaultValues}
      onSubmitAction={onClientFormSubmit}
      validationSchema={allClientSchemas}
    >
      <MultiStepSidebar
        icon={<FaUser />}
        title={client.name + " " + client.lastName}
        pages={clientSidebarPages}
      />
      <MultiStepFormContent
        itemId={client._id}
        itemCreatedAt={client.createdAt}
        itemUpdatedAt={client.updatedAt}
      >
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

export default EditClientForm;
