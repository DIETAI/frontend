import React, { useEffect, useState } from "react";
import axios from "utils/api";

//form
import {
  useForm,
  FormProvider,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//styles
import * as Styled from "./AddDinnerModal.styles";

//interfaces
import { IDinnerData } from "interfaces/dinner.interfaces";

//icons
import { FaUserCog } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//translation
import { useTranslation } from "react-i18next";

//interfaces
import { IDinnerModalProps } from "./AddDinnerModal.interfaces";

//api
import { getDinner, getDinners } from "services/getDinners";

//schema
import { dietDinnerSchema, IDietDinner } from "./AddDinnerModel.schema";
import { getProduct } from "services/getProducts";

const defaultDietDinnerValues = dietDinnerSchema.cast({});
type IDietDinnerValues = typeof defaultDietDinnerValues;

const createPortions = (minAmount: number, maxAmount: number) => {
  const portionDifference = maxAmount - minAmount;

  const portions: number[] = [];

  for (
    let index = minAmount;
    index <= maxAmount;
    index = index + portionCount(portionDifference)
  ) {
    portions.push(index);
  }

  return portions;
};

const portionCount = (portionDifference: number) => {
  if (portionDifference <= 50) {
    return 5;
  }
  if (portionDifference > 50 && portionDifference <= 150) {
    return 10;
  }
  if (portionDifference > 150 && portionDifference <= 300) {
    return 20;
  }
  if (portionDifference > 300 && portionDifference <= 500) {
    return 50;
  }

  return 75;
};

const AddDinnerModal = ({ closeModal, meal }: IDinnerModalProps) => {
  const methods = useForm({
    resolver: yupResolver(dietDinnerSchema),
    shouldUnregister: false,
    defaultValues: defaultDietDinnerValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
    setValue,
  } = methods;

  const dietDinnerId = watch("dinnerId") as IDietDinner["dinnerId"];

  const { t } = useTranslation();

  const { dinners, dinnersError, dinnersLoading } = getDinners();

  if (dinnersLoading) return <div>dinners loading</div>;
  if (dinnersError) return <div>dinners error</div>;

  const appendDinner = (dinner: IDinnerData) => {
    setValue("dietId", meal.dietId);
    setValue("dayId", meal.dayId);
    setValue("dietMealId", meal._id);
    setValue("dinnerId", dinner._id);
    setValue("total.kcal", 0);
    setValue("order", 1);
    setValue(
      "products",
      dinner.products.map((dinnerProduct) => ({
        productId: dinnerProduct.productId,
        selectedPortionGram: dinnerProduct.defaultAmount,
        total: {
          kcal: 0,
        },
      }))
    );
    console.log("dodano danie");
    return;
  };

  return (
    <Styled.DinnerModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("diet.form.dinner.modal.title")}
        description={t("diet.form.dinner.modal.description")}
      />
      <Styled.DinnerModalContentWrapper>
        <Styled.DinnerModalSidebar>
          <h2>Posiłki:</h2>
          {dinners?.map((dinner) => (
            <Styled.DinnerModalSidebarItem
              key={dinner._id}
              onClick={() => appendDinner(dinner)}
            >
              <h2>{dinner.name}</h2>
            </Styled.DinnerModalSidebarItem>
          ))}
        </Styled.DinnerModalSidebar>
        {dietDinnerId && (
          <FormProvider {...methods}>
            <AddDinnerFormContent />
          </FormProvider>
        )}
      </Styled.DinnerModalContentWrapper>
    </Styled.DinnerModalContainer>
  );
};

const AddDinnerFormContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const dietDinner = getValues() as IDietDinner;

  if (!dietDinner) return <div>dietDinner error</div>;

  const { dinner, dinnerLoading, dinnerError } = getDinner(dietDinner.dinnerId);

  if (dinnerLoading) return <div>dinnerLoading...</div>;
  if (dinnerError) return <div>dinnerError</div>;

  const onDietDinnerFormSubmit = async (data: IDietDinnerValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie posiłku");
    console.log(data);

    try {
      const newDietDinner = await axios.post("/api/v1/dietDinners", data, {
        withCredentials: true,
      });
      console.log({ newDietDinner });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Styled.AddDinnerFormWrapper
      onSubmit={handleSubmit(onDietDinnerFormSubmit as any)}
      autoComplete="off"
    >
      {JSON.stringify(watch())}
      <h2>{dinner?.name}</h2>
      <div>
        <h3>Produkty:</h3>
        <ul>
          {dinner?.products?.map((dinnerProduct) => (
            <DinnerProduct
              key={dinnerProduct.productId}
              dinnerProduct={dinnerProduct}
            />
          ))}
        </ul>
      </div>
      <Button
        fullWidth
        type="submit"
        // variant={isSubmitting || !isValid ? "disabled" : "primary"}
      >
        {isSubmitting ? "loading" : "dodaj danie"}
      </Button>
    </Styled.AddDinnerFormWrapper>
  );
};

interface IDinnerProductProps {
  dinnerProduct: IDinnerData["products"][0];
}

const DinnerProduct = ({ dinnerProduct }: IDinnerProductProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const dietDinner = watch() as IDietDinner;

  const { product, productLoading, productError } = getProduct(
    dinnerProduct.productId
  );

  if (productLoading) return <div>product loading...</div>;
  if (productError) return <div>product error...</div>;

  const getDietDinnerProductSelectedPortion = () => {
    const product = dietDinner.products?.filter(
      ({ productId }) => productId === dinnerProduct.productId
    )[0];
    const selectedPortion = product?.selectedPortionGram;
    return selectedPortion;
  };

  const selectNewPortion = (portionGram: number) => {
    const productIndex = dietDinner.products?.findIndex(
      ({ productId }) => productId === dinnerProduct.productId
    );
    setValue(`products.${productIndex}.selectedPortionGram`, portionGram);

    //setTotalValues
  };

  return (
    <>
      <h4>{product?.name}</h4>
      <div>
        <div>
          <p>min: {dinnerProduct.minAmount}</p>
          <p>max: {dinnerProduct.maxAmount}</p>
        </div>

        <h4>Dostępne porcje:</h4>
        <Styled.DinnerProductPortionsWrapper>
          {createPortions(
            dinnerProduct.minAmount as number,
            dinnerProduct.maxAmount as number
          ).map((portionGram) => (
            <Styled.DinnerProductPortion
              onClick={() => selectNewPortion(portionGram)}
              key={portionGram}
              selectedPortion={
                portionGram === getDietDinnerProductSelectedPortion()
              }
            >
              {portionGram} g
            </Styled.DinnerProductPortion>
          ))}
        </Styled.DinnerProductPortionsWrapper>
      </div>
    </>
  );
};

export default AddDinnerModal;
