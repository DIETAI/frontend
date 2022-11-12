import React from "react";
import { useTranslation } from "react-i18next";

//icon
import { FaUtensils } from "icons/icons";

//components
import NewProductForm from "./components/ProductForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import ProductSidebarSteps from "../components/form/sidebar/steps/ProductSidebarSteps";
import PageNav from "components/pageNav/PageNav";

import { productFormSteps } from "../utils/steps";
import { productNavLinks } from "../utils/navLinks";

const productSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: <ProductSidebarSteps productFormSteps={productFormSteps} />,
  },
];

const NewProduct = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageNav headingTitle={"Produkty"} pageNavLinks={productNavLinks} />
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={t("product.sidebar.title")}
          pages={productSidebarPages}
        />
        <NewProductForm />
      </MultiStepContainer>
    </>
  );
};

export default NewProduct;
