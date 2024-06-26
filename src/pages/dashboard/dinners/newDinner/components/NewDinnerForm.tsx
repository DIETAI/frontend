import React, { useState } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSearchParams, createSearchParams } from "react-router-dom";

//styles
import * as Styled from "./NewDinnerForm.styles";

//form
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema
import { basicInfoSchema } from "../../schema/newDinner.schema";

//components
import Input from "components/form/input/Input";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { BasicInfo } from "../../components/form/steps";
import Autocomplete from "components/form/autocomplete/Autocomplete";
import { preparationTimeOptions } from "../../components/form/steps/BasicInfo";

//icons
import { FaFileInvoice, FaUtensils, FaFolderPlus } from "icons/icons";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

const defaultValues = basicInfoSchema.cast({});
type INewDinnerValues = typeof defaultValues;

const NewDinnerForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const [searchParams, setSearchParams] = useSearchParams();
  const dietId = searchParams.get("dietId"); //from newDiet

  const methods = useForm({
    resolver: yupResolver(basicInfoSchema),
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

  const onDinnerFormSubmit = async (data: INewDinnerValues) => {
    console.log("wysyłanie posiłku");
    console.log(data);
    try {
      const newDinner = await axios.post("/api/v1/dinners", data, {
        withCredentials: true,
      });
      console.log({ newDinner });
      handleAlert("success", "Stworzono posiłek");
      if (dietId) {
        navigate({
          pathname: `/dashboard/dinners/edit/${newDinner.data._id}`,
          search: `?${createSearchParams({ dietId })}`,
        });
      } else {
        navigate(`/dashboard/dinners/edit/${newDinner.data._id}`);
      }
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie posiłku nie powiodło się");
    }
  };

  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  return (
    <Styled.FormWrapper>
      <Heading icon={<FaUtensils />} title="Nowy posiłek" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onDinnerFormSubmit)}>
          <Input
            label={`${t("dinner.form.basic_info.name")} *`}
            type="text"
            name="name"
            fullWidth
          />
          <Autocomplete
            name="preparation_time"
            label={`${t("dinner.form.basic_info.preparation_time")}`}
            options={preparationTimeOptions}
            optionLabel="name"
            optionRender="type"
            fullWidth
          />
          {/* <Input
            label={`${t("dinner.form.basic_info.description")}`}
            type="text"
            name="description"
            fullWidth
            textarea
          />
          <Input
            label={`${t("dinner.form.basic_info.recipe")}`}
            type="text"
            name="recipe"
            fullWidth
            textarea
          /> */}
          {/* <DashedSelect
            icon={<FaFolderPlus />}
            text={`${t("dinner.form.basic_info.mealTypes")}`} //breakfast, dinner etc..
            onClick={openAddFolderModal}
            fullWidth
          />
          <DashedSelect
            icon={<FaFolderPlus />}
            text={`${t("dinner.form.basic_info.dietKinds")}`}
            onClick={openAddFolderModal}
            fullWidth
          /> */}
          <Button
            type="submit"
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            fullWidth
          >
            stwórz posiłek
          </Button>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default NewDinnerForm;
