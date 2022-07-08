import React from "react";
import * as Styled from "../DinnerContent.styles";

//components
import Image from "components/form/images/image/Image";

//icons
import { FaInfoCircle } from "icons/icons";

import { IDinnerData } from "interfaces/dinner/dinner.interfaces";

interface IDinnerInfo {
  name: IDinnerData["name"];
  image: IDinnerData["image"];
  gallery: IDinnerData["gallery"];
}

const BasicInfo = ({ name, image, gallery }: IDinnerInfo) => {
  return (
    <Styled.DinnerStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaInfoCircle />
        </Styled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </Styled.StepHeadingWrapper>
      <Styled.DinnerItemsWrapper>
        <Styled.DinnerItem>
          <h2>nazwa: </h2>
          <p>{name}</p>
        </Styled.DinnerItem>
        <Styled.DinnerItem>
          <div>
            <h2>zdjęcie</h2>
            {image && <Image imageId={image} />}
          </div>
        </Styled.DinnerItem>
        <Styled.DinnerItem>
          <div>
            <h2>galeria</h2>
            {!gallery?.length && <p>-</p>}
            {gallery &&
              gallery.map((imageUrl, index) => (
                <Image key={imageUrl + index} imageId={imageUrl} />
              ))}
          </div>
        </Styled.DinnerItem>
      </Styled.DinnerItemsWrapper>
    </Styled.DinnerStepWrapper>
  );
};

export default BasicInfo;
