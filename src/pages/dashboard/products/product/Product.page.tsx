import React from "react";
import { productNavLinks } from "../utils/navLinks";
import { useParams } from "react-router";

//styles
import * as Styled from "./ProductPage.styles";

//icons
import { FaInfoCircle } from "icons/icons";

//components
import ProductContent from "./components/content/ProductContent";
import ProductSidebar from "./components/sidebar/ProductSidebar";
import { productSidebarSections } from "./components/sidebar/sections";
import PageNav from "components/pageNav/PageNav";

const Product = () => {
  const { productId } = useParams();

  return (
    <>
      <PageNav
        headingTitle={"Produkty"}
        pageNavLinks={[
          ...productNavLinks,
          {
            id: productNavLinks.length + 1,
            title: "produkt",
            path: `/dashboard/products/${productId}`,
          },
        ]}
      />
      <Styled.ProductContainer>
        <ProductContent />
        <ProductSidebar
          title={"Dane produktu"}
          icon={<FaInfoCircle />}
          sections={productSidebarSections}
        />
      </Styled.ProductContainer>
    </>
  );
};

export default Product;
