import React, { useEffect, useState, useLayoutEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IChildrenProps } from "interfaces/children.interfaces";
import Button from "components/form/button/Button";
import axios from "utils/api";
import { useParams } from "react-router";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

import useSWR, { useSWRConfig } from "swr";

//components
import AddDinnerNav from "../nav/EditDinnerNav";

//interfaces
import {
  IFormStepProps,
  IDefaultValues,
} from "./MultistepContainer.interfaces";

import { IDietDinner, IDietDinnerPortion } from "../EditDinnerModel.schema";

//styles
import * as Styled from "./MultistepContainer.styles";

type DietDinner = IDietDinner & IDietDinnerPortion;

export const FormStep = ({ children }: IFormStepProps) => {
  return <>{children}</>;
};

interface IMultiStepProps {
  children: IChildrenProps["children"];
  defaultValues: IDefaultValues["defaultValues"];
  closeModal: () => void;
  dietDinnerId: string;
}

const MultiStepContainer = ({
  children,
  defaultValues,
  closeModal,
  dietDinnerId,
}: IMultiStepProps) => {
  const { handleAlert } = useAlert();
  const { mutate } = useSWRConfig();
  const { dietEditId } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<IFormStepProps>[];

  const currentChild = childrenArray[activeStep];
  const currentValidationSchema = currentChild.props.validationSchema;

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    shouldUnregister: false,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
  } = methods;

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isStepValid = await trigger();
    if (isStepValid) {
      return setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = () => {
    return activeStep === childrenArray.length - 1;
  };

  const onSubmit = async (data: DietDinner) => {
    //stripe session
    console.log(data);
    try {
      const editDietDinner = await axios.put(
        `/api/v1/dietDinners/${dietDinnerId}`,
        data,
        {
          withCredentials: true,
        }
      );

      handleAlert("success", "Edytowano posiłek");

      //mutate dietquery obj
      await mutate(`/api/v1/diets/${dietEditId}/populate`); //correct

      closeModal();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Wystąpił błąd podczas edytowania posiłku");
    }
  };

  // check isValid after change step
  useEffect(() => {
    const checkIsValid = async () => {
      await trigger();
    };

    //tablica z walidowanymi stronami
    checkIsValid();
  }, [activeStep]);

  return (
    <Styled.MultistepWrapper>
      <AddDinnerNav
        activePage={activeStep}
        setActivePage={setActiveStep}
        valid={isValid}
        isLastStep={isLastStep()}
      />

      <Styled.MultistepContent>
        <FormProvider {...methods}>
          <form autoComplete="off">
            {currentChild}
            <Styled.ButtonsWrapper>
              {activeStep > 0 && (
                <Button
                  variant={activeStep === 0 ? "disabled" : "secondary"}
                  onClick={handleBack}
                >
                  Wstecz
                </Button>
              )}
              <Button
                type="submit"
                variant={isSubmitting || !isValid ? "disabled" : "primary"}
                onClick={
                  isLastStep() ? handleSubmit(onSubmit) : (handleNext as any)
                }
              >
                {isLastStep() ? "Edytuj posiłek" : "Dalej"}
              </Button>
            </Styled.ButtonsWrapper>
          </form>
        </FormProvider>
      </Styled.MultistepContent>
    </Styled.MultistepWrapper>
  );
};

export default MultiStepContainer;
