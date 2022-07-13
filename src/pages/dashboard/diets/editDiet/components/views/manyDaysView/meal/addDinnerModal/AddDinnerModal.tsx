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
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";

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
import {
  getDinnerPortions,
  getDinnerPortion,
  getDinnerPortionsQuery,
} from "services/getDinnerPortions";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//components
import AddDinnerFormContent from "./form/AddDinnerFormContent";

const defaultDietDinnerValues = dietDinnerSchema.cast({});
export type IDietDinnerValues = typeof defaultDietDinnerValues;

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

  // const dietDinnerId = watch("dinnerId") as IDietDinner["dinnerId"];
  const dietDinnerPortionId = watch(
    "dinnerPortionId"
  ) as IDietDinner["dinnerPortionId"];

  const { t } = useTranslation();

  const { dinners, dinnersError, dinnersLoading } = getDinners();

  if (dinnersLoading) return <div>dinners loading</div>;
  if (dinnersError) return <div>dinners error</div>;

  return (
    <Styled.DinnerModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("diet.form.dinner.modal.title")}
        description={t("diet.form.dinner.modal.description")}
      />
      <FormProvider {...methods}>
        <Styled.DinnerModalContentWrapper>
          <Styled.DinnerModalSidebar>
            <h2>Posiłki:</h2>
            {dinners?.map((dinner) => (
              <DinnerSidebarItem
                key={dinner._id}
                dinnerId={dinner._id}
                meal={meal}
              />
            ))}
          </Styled.DinnerModalSidebar>
          {dietDinnerPortionId && (
            <AddDinnerFormContent closeModal={closeModal} mealId={meal._id} />
          )}
        </Styled.DinnerModalContentWrapper>
      </FormProvider>
    </Styled.DinnerModalContainer>
  );
};

const DinnerSidebarItem = ({
  dinnerId,
  meal,
}: {
  dinnerId: string;
  meal: IDietMealQueryData;
}) => {
  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);
  // const { dinnerPortions, dinnerPortionsError, dinnerPortionsLoading } =
  //   getDinnerPortions(dinnerId);

  const {
    dinnerPortionsQuery,
    dinnerPortionsLoadingQuery,
    dinnerPortionsErrorQuery,
  } = getDinnerPortionsQuery(dinnerId);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const appendDinner = (dinnerPortionId: IDietDinner["dinnerPortionId"]) => {
    setValue("dietId", meal.dietId);
    setValue("dayId", meal.dayId);
    setValue("dietMealId", meal._id);
    setValue("dinnerPortionId", dinnerPortionId);
    // setValue("dinnerId", dinner._id);
    // setValue("total.kcal", 0);
    setValue("order", 1);
    // setValue(
    //   "products",
    //   dinner.products.map((dinnerProduct) => ({
    //     productId: dinnerProduct.productId,
    //     selectedPortionGram: dinnerProduct.defaultAmount,
    //     total: {
    //       kcal: 0,
    //     },
    //   }))
    // );
    console.log("dodano danie");
    return;
  };

  if (dinnerLoading || dinnerPortionsLoadingQuery) return <div>loading...</div>;
  if (dinnerError || dinnerPortionsErrorQuery) return <div>error...</div>;

  return (
    <Styled.DinnerModalSidebarItem

    // onClick={() => appendDinner(dinner)}
    // onClick={() => openDinnerPortions(dinner._id)}
    >
      <h2>{dinner?.name}</h2>
      <div>
        porcje:{" "}
        {dinnerPortionsQuery?.map((dinnerPortion) => (
          <Styled.DinnerSidebarItemPortion
            key={dinnerPortion._id}
            onClick={() => appendDinner(dinnerPortion._id)}
          >
            {" "}
            typ porcji: <h2>{dinnerPortion.type}</h2>
            <div>
              razem: <h3>kcal: {dinnerPortion.total.kcal}</h3>
            </div>
            <div>
              produkty:{" "}
              {dinnerPortion.dinnerProducts.map((dinnerProductPortion) => (
                <div key={dinnerProductPortion.dinnerProductId}>
                  <h2>
                    produkt: {dinnerProductPortion.dinnerProduct.product.name}
                  </h2>{" "}
                  <h3>porcja: {dinnerProductPortion.portion}</h3>
                </div>
              ))}
            </div>
          </Styled.DinnerSidebarItemPortion>
        ))}
      </div>
    </Styled.DinnerModalSidebarItem>
  );
};

export default AddDinnerModal;
