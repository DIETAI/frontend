import React from "react";
import * as Styled from "../ProductContent.styles";

//components
import Image from "components/form/images/image/Image";

//icons
import { FaInfoCircle } from "icons/icons";

import { IProductData } from "interfaces/product.interfaces";

interface IProductInfo {
  name: IProductData["name"];
  kcal: IProductData["kcal"];
  image: IProductData["image"];
  gallery: IProductData["gallery"];
}

const BasicInfo = ({ name, kcal, image, gallery }: IProductInfo) => {
  return (
    <Styled.ProductStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaInfoCircle />
        </Styled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </Styled.StepHeadingWrapper>
      <Styled.ProductItemsWrapper>
        <Styled.ProductItem>
          <h2>nazwa: </h2>
          <p>{name}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>kcal: </h2>
          <p>{kcal}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <div>
            <h2>zdjęcie</h2>
            {image && <Image imageId={image} />}
          </div>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <div>
            <h2>galeria</h2>
            {!gallery?.length && <p>-</p>}
            {gallery &&
              gallery.map((imageUrl, index) => (
                <Image key={imageUrl + index} imageId={imageUrl} />
              ))}
          </div>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default BasicInfo;
