import React, { useEffect } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";
import { useSearchParams, createSearchParams } from "react-router-dom";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

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

const DietEstablishmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientIdParam = searchParams.get("patientId"); //from newDiet
  const newDietNameParam = searchParams.get("dietName"); //from newDiet
  const newDietDaysAmountParam = searchParams.get("daysAmount"); //from newDiet

  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onDietEstablishmentFormSubmit = async (
    data: IDietEstablishmentValues
  ) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
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
      console.log({ newDietEstablishment });
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
    <MultiStepFormContent
      defaultValues={defaultDietEstablishmentsValues}
      onSubmitAction={onDietEstablishmentFormSubmit}
      validationSchema={allDietEstablishmentSchemas}
    >
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
  );
};

export default DietEstablishmentForm;
