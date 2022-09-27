import React from "react";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./MultiStepContent.styles";

//components
import Button from "components/form/button/Button";

//form
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IMultiStepContentProps } from "./MultiStepContent.interfaces";

const MultiStepContent = ({
  children,
  defaultValues,
  onSubmitAction,
  validationSchema,
  itemId,
  itemCreatedAt,
  itemUpdatedAt,
}: IMultiStepContentProps) => {
  const { t, i18n } = useTranslation();
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

  const dateFormat = (date: string) => {
    const formatDate = format(new Date(date), "dd.MM.yyyy, hh:mm", {
      locale: pl,
    });

    return formatDate;
  };

  return (
    <FormProvider {...methods}>
      <Styled.MultiStepContainer>
        <Styled.MultiStepContentWrapper>
          {children}
        </Styled.MultiStepContentWrapper>
        <Styled.SaveOptionsWrapper>
          <p>
            ID: {itemId ? <b>{itemId}</b> : <span>{t("formOptions.new")}</span>}
          </p>
          <p>
            {t("formOptions.created")}:{" "}
            <b>{itemCreatedAt ? dateFormat(itemCreatedAt) : "-"}</b>
          </p>
          <p>
            {t("formOptions.lastUpdated")}:{" "}
            <b>{itemUpdatedAt ? dateFormat(itemUpdatedAt) : "-"}</b>
          </p>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmitAction) as () => void}
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            // variant="primary"
          >
            {itemId ? t("formOptions.edit") : t("formOptions.save")}
          </Button>
        </Styled.SaveOptionsWrapper>
      </Styled.MultiStepContainer>
    </FormProvider>
  );
};

export default MultiStepContent;
