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
  const { t } = useTranslation();

  const addProductFormMethods = useForm({
    resolver: yupResolver(dinnerProductSchema),
    shouldUnregister: false,
    defaultValues: defaultDinnerProductValues,
    mode: "onBlur",
  });

  const { handleSubmit: handleAddProductSubmit, getValues } =
    addProductFormMethods;

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

        await mutate(`/api/v1/dinnerProducts/dinner/${dinnerId}`);
        await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}`);

        console.log({ newDinnerProduct });
      } catch (e) {
        console.log(e);
      }
    })(e);

    closeModal();
  };

  return (
    <Styled.ProductModalContainer>
      <Heading
        icon={<FaCarrot />}
        title={t("dinner.form.products.modal.title")}
      />
      {/* <p>
        dodać informacje (produkt niezalecany w rodzajach diety - łatwostrawna -
        dodanie wtedy tej wykluczonej diety do posiłku)
      </p> */}
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
