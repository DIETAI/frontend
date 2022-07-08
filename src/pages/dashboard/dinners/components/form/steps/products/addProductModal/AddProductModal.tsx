import React, { SyntheticEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "utils/api";
import { useParams } from "react-router";
import { mutate } from "swr";
import { getDinnerProducts } from "services/getDinnerProducts";
import { getDinnerPortions } from "services/getDinnerPortions";
import { BaseSyntheticEvent } from "react";

//interfaces
import { IProductModalProps } from "./AddProductModal.interfaces";
import { IDinnerProducts } from "../../../../../schema/newDinner.schema";

//styles
import * as Styled from "./AddProductModal.styles";

//form
import { useFormContext } from "react-hook-form";

//icons
import { FaUserCog, FaCarrot } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import AddProductFormContent from "./productForm/ProductForm";

//translation
import { useTranslation } from "react-i18next";

//schema
import { dinnerProductSchema } from "./schema/dinnerProduct.schema";

const defaultDinnerProductValues = dinnerProductSchema.cast({});
type IDinnerProductValues = typeof defaultDinnerProductValues;

const AddProductModal = ({ closeModal }: IProductModalProps) => {
  const { dinnerId } = useParams();
  const { dinnerProducts } = getDinnerProducts(dinnerId as string);
  const { dinnerPortions } = getDinnerPortions(dinnerId as string);
  const { t } = useTranslation();

  const addProductFormMethods = useForm({
    resolver: yupResolver(dinnerProductSchema),
    shouldUnregister: false,
    defaultValues: defaultDinnerProductValues,
    mode: "onBlur",
  });

  const { handleSubmit: handleAddProductSubmit, getValues } =
    addProductFormMethods;
  // const dinnerProducts = getValues("products") as IDinnerProducts["products"];

  const addProduct = (
    // data: IDinnerProductValues,
    e: BaseSyntheticEvent
  ) => {
    console.log({ e });
    e.preventDefault();
    e.stopPropagation();

    handleAddProductSubmit(async (data) => {
      console.log("wysyłanie produktu");
      // const data = getValues();
      console.log(data);
      const dinnerProductData = { ...data, dinnerId: dinnerId, order: 1 };
      try {
        const newDinnerProduct = await axios.post(
          "/api/v1/dinnerProducts",
          dinnerProductData,
          {
            withCredentials: true,
          }
        );

        if (dinnerProducts) {
          await mutate(`/api/v1/dinnerProducts/dinner/${dinnerId}`, [
            ...dinnerProducts,
            newDinnerProduct.data,
          ]);
        }

        //add first default portion
        if (dinnerProducts && dinnerPortions) {
          if (dinnerPortions.length < 1) {
            const newDinnerPortionObj = {
              type: "default",
              dinnerId: dinnerId,
              total: {
                kcal: 300,
              },
              dinnerProducts: dinnerProducts.map((dinnerProduct) => ({
                dinnerProductId: dinnerProduct._id,
                portion: dinnerProduct.defaultAmount,
                total: {
                  kcal: 200,
                },
              })),
            };

            // const newDinnerPortion = await axios.post(
            //   "/api/v1/dinnerPortions",
            //   newDinnerPortionObj,
            //   {
            //     withCredentials: true,
            //   }
            // );

            // console.log({ newDinnerPortion });

            await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}`, [
              newDinnerPortionObj,
            ]);
          }

          //edit portions
          if (dinnerPortions.length > 0) {
            await mutate(
              `/api/v1/dinnerPortions/dinner/${dinnerId}`,
              dinnerPortions.map((dinnerPortion) => ({
                ...dinnerPortion,
                dinnerProducts: [
                  ...dinnerPortion.dinnerProducts,
                  {
                    dinnerProductId: newDinnerProduct.data._id,
                    portion: newDinnerProduct.data.defaultAmount,
                    total: {
                      kcal: 200,
                    },
                  },
                ],
              }))
            );
          }
        }

        console.log({ newDinnerProduct });

        //add default Portion
        //if(!defaultPortion) add
        // jeśli usunięcie produktu => usunięcie produktu z każdego zestawu porcji
        // jeśli dodanie produktu => dodanie do każdego zestawu porcji w domyślnej ilości na backendzie
      } catch (e) {
        console.log(e);
      }
    })(e);

    // setValue("products", [...dinnerProducts, data]);

    closeModal();
  };

  return (
    <Styled.ProductModalContainer>
      <Heading
        icon={<FaCarrot />}
        title={t("dinner.form.products.modal.title")}
        // description={t("dinner.form.products.modal.description")}
      />
      {/* {JSON.stringify(watch())} */}
      <FormProvider {...addProductFormMethods}>
        <form onSubmit={addProduct}>
          <AddProductFormContent />
        </form>
      </FormProvider>
      <Styled.ButtonWrapper></Styled.ButtonWrapper>
    </Styled.ProductModalContainer>
  );
};

export default AddProductModal;
