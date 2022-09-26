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
import GeneratedDaysLoading from "./generatedDaysLoading/GeneratedDaysLoading";

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
// import { generateDiet } from "../../helpers/generateDiet";
import { generateDiet as generateDietV2 } from "../../helpers/generateDietV2";

//styles
import * as Styled from "./MultistepContainer.styles";
import { AxiosResponse } from "axios";
import { getAllDietMeals } from "services/getDietMeals";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import { addDietGenerate, addDietGenerateAction } from "store/dietGenerate";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

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

interface IMultiStepProps {
  children: IChildrenProps["children"];
  defaultValues: IDefaultValues["defaultValues"];
  closeModal: () => void;
}

const MultiStepContainer = ({
  children,
  defaultValues,
  closeModal,
}: IMultiStepProps) => {
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
  const { generatedDays, generateDietLoading } = useSelector(
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

  const daysToGenerate = watch("days") as string[];

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

    console.log({ generateDietLoading });

    if (!dietMeals) return;

    // const initialStateGenerateDays = data.days.map((dayId) => ({
    //   loading: true,
    //   error: false,
    //   generated: false,
    //   _id: dayId,
    //   name: `Dzień ${dayId}`,
    //   dietId: "",
    // }));

    closeModal();
    dispatch(addDietGenerateAction(true));
    // dispatch(addDaysGenerate(initialStateGenerateDays));

    const generatedDiet = generateDietV2({
      days: data.days,
      generateMealsSettings: data.generateMealsSettings as any,
      meals: data.meals as any,
      allDietMeals: dietMeals,
      dispatch,
      addDietGenerate,
      addDietGenerateAction,
    });

    // const generatedDiet = await generateDiet({
    //   days: data.days,
    //   generateMealsSettings: data.generateMealsSettings as any,
    //   meals: data.meals as any,
    //   allDietMeals: dietMeals,
    //   dispatch,
    //   addDietGenerate,
    //   dietGenerateAction,
    //   setDietGenerateAction,
    //   addDietGenerateAction,
    // });

    // console.log({ generatedDiet: generatedDiet });

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

  // if (dietGenerateAction.loading) {
  //   return (
  //     <GeneratedDaysLoading
  //       dietGenerateAction={dietGenerateAction}
  //       daysToGenerate={daysToGenerate}
  //     />
  //   );
  // }

  // if (generatedDays.length > 0) {
  //   return <GeneratedDays />;
  // }

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
