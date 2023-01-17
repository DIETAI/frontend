import React from "react";

//queries
import { getProducts } from "services/getProducts";

//components
import Image from "components/form/images/image/Image";

//styles
import * as Styled from "../ProductSelectPopup.styles";
import { IProductData } from "interfaces/product.interfaces";

interface IAllProductsProps {
  selectProduct: (productId: string) => void;
  searchValue: string;
}

const optionFilter = (products: IProductData[], searchValue: string) => {
  if (products.find((product) => product.name === searchValue)) {
    return products;
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const AllProducts = ({ selectProduct, searchValue }: IAllProductsProps) => {
  const { products, productsError, productsLoading } = getProducts();

  if (productsLoading) return <div>products loading</div>;
  if (productsError || !products) return <div>products error</div>;

  const renderProducts = optionFilter(products, searchValue);

  return (
    <Styled.SelectPopupItemList>
      {renderProducts.length > 0 &&
        renderProducts.map((product) => (
          <Styled.SelectPopupItem
            key={product._id}
            onClick={() => selectProduct(product._id)}
          >
            {product.image && (
              <Image imageId={product.image._id} roundedDataGrid={true} />
            )}

            <Styled.ItemContent>
              <h2>{product.name}</h2>
              {product.description && <p> {product.description}</p>}
              <Styled.ItemFeaturesWrapper>
                <Styled.ItemFeature>
                  B (g): <b>{product.protein.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  T (g): <b>{product.fat.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  W (g): <b>{product.carbohydrates.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Wp (g): <b>{product.digestableCarbohydrates.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Bł (g): <b>{product.fiber.gram}</b>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  Kcal: <b>{product.kcal}</b>
                </Styled.ItemFeature>
              </Styled.ItemFeaturesWrapper>
            </Styled.ItemContent>
          </Styled.SelectPopupItem>
        ))}
    </Styled.SelectPopupItemList>
  );
};

export default AllProducts;
