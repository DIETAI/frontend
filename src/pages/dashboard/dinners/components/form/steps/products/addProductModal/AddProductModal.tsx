import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//interfaces
import { IProductModalProps } from "./AddProductModal.interfaces";
import { IDinnerProducts } from "../../../../../schema/newDinner.schema";

//styles
import * as Styles from "./AddProductModal.styles";

//form
import { useFormContext } from "react-hook-form";

//icons
import { FaUserCog } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import Input from "components/form/input/Input";

//translation
import { useTranslation } from "react-i18next";
import { getProducts } from "services/getProducts";

export const dinnerProductSchema = yup.object({
  productId: yup.string().required("To pole jest wymagane").default(""),
  defaultAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane")
    .default(100),
  minAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(50),
  // .lessThan(
  //   yup.ref("max_amount"),
  //   "wartość musi być mniejsza niż maksymalna ilość"
  // ),
  maxAmount: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .default(150),
  // .moreThan(
  //   yup.ref("min_amount"),
  //   "wartość musi być większa niż minimalna ilość"
  // ),
  portionsGram: yup.array(yup.number()),
});

export type IDinnerProduct = yup.InferType<typeof dinnerProductSchema>;

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
    // const newDinnerProduct: IDinnerProducts["products"][0] = {
    //   productId: "asda",
    //   defaultAmount: 20,
    //   minAmount: 40,
    //   maxAmount: 60,
    //   portionsGram: [20, 30],
    // };

    setValue("products", [...dinnerProducts, data]);
    closeModal();
  };

  return (
    <Styles.RoleModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("dinner.form.products.modal.title")}
        description={t("dinner.form.products.modal.description")}
      />
      {JSON.stringify(watch())}
      <FormProvider {...addProductFormMethods}>
        <form onSubmit={handleAddProductSubmit(addProduct)}>
          <AddProductFormContent />
        </form>
      </FormProvider>
      <Styles.ButtonWrapper></Styles.ButtonWrapper>
    </Styles.RoleModalContainer>
  );
};

const AddProductFormContent = () => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { products, productsError, productsLoading } = getProducts();

  if (productsLoading) return <div>products loading</div>;
  if (productsError) return <div>products error</div>;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // const value = !e.currentTarget.value
    //   ? e.currentTarget.value
    //   : parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    const value = parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    setValue(e.currentTarget.name, value);
  };

  return (
    <>
      {JSON.stringify(watch())}

      {products && (
        <Styles.ProductsContainer>
          {products.map((product) => (
            <Styles.Product
              key={product._id}
              onClick={() => setValue("productId", product._id)}
            >
              <h2>{product.name}</h2> <p>{product._id}</p>
            </Styles.Product>
          ))}
        </Styles.ProductsContainer>
      )}

      <Input label="produkt" type="text" name={`productId`} fullWidth />
      <Input
        label="ilość (domyślna)"
        type="number"
        name={`defaultAmount`}
        fullWidth
        controlled
        onChange={handleChange}
      />
      <Input
        label="ilość (min)"
        type="number"
        name={`minAmount`}
        fullWidth
        controlled
        onChange={handleChange}
      />
      <Input
        label="ilość (max)"
        type="number"
        name={`maxAmount`}
        fullWidth
        controlled
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant={!isValid || isSubmitting ? "disabled" : "primary"}
      >
        Dodaj produkt
      </Button>
    </>
  );
};

export default AddProductModal;
