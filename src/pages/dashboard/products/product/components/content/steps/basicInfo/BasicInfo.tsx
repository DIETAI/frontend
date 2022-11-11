import React from "react";

//styles
import * as StepStyled from "../../ProductContent.styles";
import * as Styled from "./BasicInfo.styles";

//components
import Image from "components/form/images/image/Image";

//icons
import { FaInfoCircle } from "icons/icons";

import AppleGif from "assets/apple.gif";
import LogoBackground from "assets/logo-icon.svg";

import { IProductData } from "interfaces/product.interfaces";

interface IProductInfo {
  name: IProductData["name"];
  imageURL: IProductData["imageURL"];
  gallery: IProductData["gallery"];
  kcal: IProductData["kcal"];
  protein: IProductData["protein"];
  fat: IProductData["fat"];
  carbohydrates: IProductData["carbohydrates"];
  fiber: IProductData["fiber"];
}

const BasicInfo = ({
  name,
  imageURL,
  gallery,
  kcal,
  protein,
  fat,
  carbohydrates,
  fiber,
}: IProductInfo) => {
  return (
    <StepStyled.ProductStepWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
    >
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </StepStyled.StepHeadingWrapper>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfoImageWrapper>
          <img className="backgroundImg" src={LogoBackground} />

          {imageURL && <img className="productImg" src={imageURL} />}
        </Styled.ProductInfoImageWrapper>
        <Styled.ProductInfoDescriptionWrapper>
          <h2>{name}</h2>

          <Styled.ProductInfoMacroWrapper>
            <li>
              kcal: <b>{kcal}</b>
            </li>
            <li>
              B: <b>{protein.gram}</b>
            </li>
            <li>
              T: <b>{fat.gram}</b>
            </li>
            <li>
              W: <b>{carbohydrates.gram}</b>
            </li>
            <li>
              Bł: <b>{fiber.gram}</b>
            </li>
          </Styled.ProductInfoMacroWrapper>
          {/* <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
        </Styled.ProductInfoDescriptionWrapper>
      </Styled.ProductInfoWrapper>

      {/* <Styled.ProductItemsWrapper>
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
      </Styled.ProductItemsWrapper> */}
    </StepStyled.ProductStepWrapper>
  );
};

export default BasicInfo;
