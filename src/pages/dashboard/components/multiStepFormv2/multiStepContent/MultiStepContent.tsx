import React from "react";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./MultiStepContent.styles";

//components
import Button from "components/form/button/Button";

//form context
import { useFormContext } from "react-hook-form";

//interfaces
import { IMultiStepContentProps } from "./MultiStepContent.interfaces";

const MultiStepContent = ({
  children,
  itemId,
  itemCreatedAt,
  itemUpdatedAt,
}: IMultiStepContentProps) => {
  const { t, i18n } = useTranslation();
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const dateFormat = (date: string) => {
    const formatDate = format(new Date(date), "dd.MM.yyyy, hh:mm", {
      locale: pl,
    });

    return formatDate;
  };

  return (
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
          variant={!isValid || isSubmitting ? "disabled" : "primary"}
        >
          {itemId ? t("formOptions.edit") : t("formOptions.save")}
        </Button>
      </Styled.SaveOptionsWrapper>
    </Styled.MultiStepContainer>
  );
};

export default MultiStepContent;
