import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useTranslation } from "react-i18next";
import { useSearchParams, createSearchParams } from "react-router-dom";

//icons
import { FaUser } from "icons/icons";

//components
import MultiStepFormContent from "../../../components/multiStepFormv2/multiStepContent/MultiStepContent";
import MultiStepContainer from "../../../components/multiStepFormv2/multiStepContainer/MultiStepContainer";
import MultiStepSidebar from "../../../components/multiStepFormv2/multistepSidebar/MultiStepSidebar";
import DietEstablishmentSidebarSteps from "../../components/form/sidebar/steps/DietEstablishmentSidebarSteps";
import FormStep from "../../../components/multiStepFormv2/step/Step";

//steps
import { dietEstablishmentsFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  establishmentBasicInfoSchema,
  establishmentMealsSchema,
  establishmentMacrohydratesSchema,
  establishmentFattyAcidsSchema,
  establishmentVitaminsSchema,
  establishmentMineralsSchema,
} from "../../schema/dietEstablishment.schema";

const allDietEstablishmentSchemas = establishmentBasicInfoSchema
  .concat(establishmentMealsSchema)
  .concat(establishmentMacrohydratesSchema)
  .concat(establishmentFattyAcidsSchema)
  .concat(establishmentVitaminsSchema)
  .concat(establishmentMineralsSchema);

const defaultDietEstablishmentsValues = allDietEstablishmentSchemas.cast({});
type IDietEstablishmentValues = typeof defaultDietEstablishmentsValues;

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
];

const NewDietEstablishmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientIdParam = searchParams.get("patientId"); //from newDiet
  const newDietNameParam = searchParams.get("dietName"); //from newDiet
  const newDietDaysAmountParam = searchParams.get("daysAmount"); //from newDiet

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleAlert } = useAlert();

  const onDietEstablishmentFormSubmit = async (
    data: IDietEstablishmentValues
  ) => {
    console.log("wysyłanie założeń");
    console.log(data);
    try {
      const newDietEstablishment = await axios.post(
        "/api/v1/dietEstablishments",
        data,
        {
          withCredentials: true,
        }
      );

      handleAlert("success", "Dodano nowe założenia żywieniowe");

      if (patientIdParam) {
        const newDietParams = {
          dietName: newDietNameParam || "",
          patientId: patientIdParam || "",
          daysAmount: newDietDaysAmountParam || "",
          establishmentId: newDietEstablishment.data._id as string,
        };
        navigate({
          pathname: `/dashboard/diets/new`,
          search: `?${createSearchParams(newDietParams)}`,
        });
      } else {
        navigate(
          `/dashboard/diet-establishments/edit/${newDietEstablishment.data._id}`
        );
      }
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie założeń żywieniowych nie powiodło się");
    }
  };

  return (
    <MultiStepContainer
      defaultValues={defaultDietEstablishmentsValues}
      onSubmitAction={onDietEstablishmentFormSubmit}
      validationSchema={allDietEstablishmentSchemas}
    >
      <MultiStepSidebar
        icon={<FaUser />}
        title={t("dietEstablishment.sidebar.title")}
        pages={dietEstablishmentSidebarPages}
      />
      <MultiStepFormContent>
        {dietEstablishmentsFormSteps.map((step) => (
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

export default NewDietEstablishmentForm;
