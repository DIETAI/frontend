import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//steps
import { productFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//interfaces
import { IProductProps } from "interfaces/product.interfaces";

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

const EditProductForm = ({ product }: IProductProps) => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onProductFormSubmit = async (data: IProductValues) => {
    console.log("edytowanie produktu");
    console.log(data);
    try {
      const editProduct = await axios.put(
        `/api/v1/products/${product._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editProduct });
      handleAlert("success", "Edytowano produkt");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie produktu nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={product}
      onSubmitAction={onProductFormSubmit}
      validationSchema={allProductSchemas}
      itemId={product._id}
      itemCreatedAt={product.createdAt}
      itemUpdatedAt={product.updatedAt}
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

export default EditProductForm;
