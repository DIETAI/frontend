import React, { useEffect } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//steps
import { productFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  product_basic_info_schema,
  product_fatty_acids_schema,
  product_macrohydrates_schema,
  product_vitamins_schema,
  product_minerals_schema,
  product_measures_schema,
  product_prices_schema,
} from "../../schema/productFormSchema";

const allProductSchemas = product_basic_info_schema
  .concat(product_fatty_acids_schema)
  .concat(product_macrohydrates_schema)
  .concat(product_vitamins_schema)
  .concat(product_minerals_schema)
  .concat(product_measures_schema)
  .concat(product_prices_schema);

const defaultProductValues = allProductSchemas.cast({});
type IProductValues = typeof defaultProductValues;

const ProductForm = () => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onProductFormSubmit = async (data: IProductValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie produktu");
    console.log(data);
    try {
      const newProduct = await axios.post("/api/v1/products", data, {
        withCredentials: true,
      });
      console.log({ newProduct });
      handleAlert("success", "Dodano nowy produkt");
      navigate(`/dashboard/products/edit/${newProduct.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie produktu nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={defaultProductValues}
      onSubmitAction={onProductFormSubmit}
      validationSchema={allProductSchemas}
    >
      {productFormSteps.map((step) => (
        <FormStep
          key={step.id}
          icon={step.icon}
          label={step.title}
          validationSchema={step.validationSchema}
          id={step.sectionId}
          sectionId={step.sectionId}
        >
          {step.stepContent}
        </FormStep>
      ))}
    </MultiStepFormContent>
  );
};

export default ProductForm;
