import React from "react";

//styles
import * as Styled from "./ProductPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import ProductContent from "./components/content/ProductContent";
import ProductSidebar from "./components/sidebar/ProductSidebar";
import { productSidebarSections } from "./components/sidebar/sections";

const Product = () => {
  return (
    <Styled.ProductContainer>
      <ProductContent />
      <ProductSidebar
        title={"Informacje"}
        icon={<FaUtensils />}
        sections={productSidebarSections}
      />
    </Styled.ProductContainer>
  );
};

export default Product;
