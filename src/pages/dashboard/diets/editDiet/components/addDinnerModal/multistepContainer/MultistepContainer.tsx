import React, { useEffect, useState, useLayoutEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues } from "react-hook-form";
import { IChildrenProps } from "interfaces/children.interfaces";
import Button from "components/form/button/Button";
import axios from "utils/api";

//components
import AddDinnerNav from "../nav/AddDinnerNav";
import Heading from "components/heading/Heading";

//interfaces
import {
  IFormStepProps,
  IDefaultValues,
} from "./MultistepContainer.interfaces";

import { IDietDinner, IDietDinnerPortion } from "../AddDinnerModel.schema";

//styles
import * as Styled from "./MultistepContainer.styles";
import { AxiosResponse } from "axios";

type DietDinner = IDietDinner & IDietDinnerPortion;

export const FormStep = ({ children }: IFormStepProps) => {
  return <div className="w-full flex flex-wrap gap-6">{children}</div>;
};

const MultiStepContainer = ({
  children,
  defaultValues,
}: IChildrenProps & IDefaultValues) => {
  const [activeStep, setActiveStep] = useState(0);

  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<IFormStepProps>[];

  const currentChild = childrenArray[activeStep];

  //   const currentValidationSchema = validationSchema[activeStep];
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
    // console.log("create stripe session");
    // try {
    //   const stripeResp: AxiosResponse<Stripe.Checkout.Session> =
    //     await axios.post(`/api/v1/transactions`, data, {
    //       withCredentials: true,
    //     });
    //   console.log({ stripeResp });
    //   const { id } = stripeResp.data;
    //   const stripe = await stripePromise;

    //   if (stripe) {
    //     const { error } = await stripe.redirectToCheckout({ sessionId: id });
    //     console.log(error);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
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
        {/* <Heading
          icon={currentChild.props.icon}
          title={currentChild.props.label}
        /> */}

        <FormProvider {...methods}>
          <form className="w-full flex flex-col gap-6" autoComplete="off">
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
                {isLastStep() ? "Dodaj posiłek" : "Dalej"}
              </Button>
            </Styled.ButtonsWrapper>
          </form>
        </FormProvider>
      </Styled.MultistepContent>
    </Styled.MultistepWrapper>
  );
};

export default MultiStepContainer;
