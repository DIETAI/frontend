import React from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//icon
import { FaUtensils } from "icons/icons";

//queries
import { getProduct } from "services/getProducts";

//components
import EditProductForm from "./components/EditProductForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import ProductSidebarSteps from "../components/form/sidebar/steps/ProductSidebarSteps";

import { productFormSteps } from "../utils/steps";

const productSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: <ProductSidebarSteps productFormSteps={productFormSteps} />,
  },
];

const EditProduct = () => {
  const { t } = useTranslation();

  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;

  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>product loading...</div>;
  if (productError || !product) return <div>product error</div>;

  console.log({ productEdit: product });

  return (
    <>
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={product.name}
          pages={productSidebarPages}
        />
        <EditProductForm product={product} />
      </MultiStepContainer>
    </>
  );
};

export default EditProduct;
