import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const addProductFormMethods = useForm({
    resolver: yupResolver(dinnerProductSchema),
    shouldUnregister: false,
    defaultValues: defaultDinnerProductValues,
    mode: "onBlur",
  });

  const { handleSubmit: handleAddProductSubmit } = addProductFormMethods;
  const dinnerProducts = getValues("products") as IDinnerProducts["products"];

  const addProduct = async (data: IDinnerProductValues) => {
    setValue("products", [...dinnerProducts, data]);
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
        <form onSubmit={handleAddProductSubmit(addProduct)}>
          <AddProductFormContent />
        </form>
      </FormProvider>
      <Styled.ButtonWrapper></Styled.ButtonWrapper>
    </Styled.ProductModalContainer>
  );
};

export default AddProductModal;
