import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

import * as Styled from "./MultiStepContainer.styles";

//form
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IMultiStepContainerProps } from "./MultiStepContainer.interfaces";

const MultiStepContainer = ({
  children,
  validationSchema,
  defaultValues,
  onSubmitAction,
}: IMultiStepContainerProps) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
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

  return (
    <FormProvider {...methods}>
      <Styled.FormContainer
        onSubmit={handleSubmit(onSubmitAction) as () => void}
      >
        {children}
      </Styled.FormContainer>
    </FormProvider>
  );
};

export default MultiStepContainer;
