import React, { useEffect, useState, useLayoutEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues } from "react-hook-form";
import { IChildrenProps } from "interfaces/children.interfaces";
import Button from "components/form/button/Button";
import axios from "utils/api";

//components
import DietGenerateNav from "../nav/DietGenerateNav";
import Heading from "components/heading/Heading";
import GeneratedDays from "./generatedDays/GeneratedDays";

//interfaces
import {
  IFormStepProps,
  IDefaultValues,
} from "./MultistepContainer.interfaces";

import {
  IDietGenerateDaysSchema,
  IDietGenerateMealsSchema,
  IDietGeneratePreferencesSchema,
} from "../../schema/dietGenerate.schema";

//helpers
import { generateDiet } from "../../helpers/generateDiet";

//styles
import * as Styled from "./MultistepContainer.styles";
import { AxiosResponse } from "axios";
import { getAllDietMeals } from "services/getDietMeals";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addDietGenerate,
  IDietGenerate,
  removeDietGenerate,
} from "store/dietGenerate";

type DietGenerate = IDietGenerateDaysSchema &
  IDietGenerateMealsSchema &
  IDietGeneratePreferencesSchema;

export interface IDietGenerateAction {
  dayId: string;
  generatedDays: string[];
  actionType: string;
  actionMessage: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const FormStep = ({ children }: IFormStepProps) => {
  return <div className="w-full flex flex-wrap gap-6">{children}</div>;
};

const MultiStepContainer = ({
  children,
  defaultValues,
}: IChildrenProps & IDefaultValues) => {
  const [dietGenerateAction, setDietGenerateAction] =
    useState<IDietGenerateAction>({
      dayId: "",
      generatedDays: [],
      actionType: "",
      actionMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    });

  const dispatch = useDispatch();
  const { generatedDays } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  const { dietMeals } = getAllDietMeals();

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

  const onSubmit = async (data: DietGenerate) => {
    //stripe session
    console.log(`diet generate: ${data}`);

    if (!dietMeals) return;

    // const diet = await generateDiet({
    //   days: data.days,
    //   generateMealsSettings: data.generateMealsSettings as any,
    //   meals: data.meals as any,
    //   allDietMeals: dietMeals,
    // });

    const generatedDiet = await generateDiet({
      days: data.days,
      generateMealsSettings: data.generateMealsSettings as any,
      meals: data.meals as any,
      allDietMeals: dietMeals,
      dispatch,
      addDietGenerate,
      dietGenerateAction,
      setDietGenerateAction,
    });

    console.log({ generatedDiet: generatedDiet });

    //generate diet algorithm

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

  if (dietGenerateAction.loading) {
    return (
      <div>
        <h3>generowanie diety dla dnia {dietGenerateAction.dayId}</h3>
        <h3>
          wygenerowane dni : {JSON.stringify(dietGenerateAction.generatedDays)}
        </h3>
      </div>
    );
  }

  if (generatedDays.length > 0) {
    return <GeneratedDays />;
  }

  return (
    <Styled.MultistepWrapper>
      <DietGenerateNav
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
            <Styled.ButtonsWrapper className="w-full flex flex-wrap gap-6 flex-col sm:flex-row">
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
                {isLastStep() ? "Generuj dietę" : "Dalej"}
              </Button>
            </Styled.ButtonsWrapper>
          </form>
        </FormProvider>
      </Styled.MultistepContent>
    </Styled.MultistepWrapper>
  );
};

export default MultiStepContainer;
