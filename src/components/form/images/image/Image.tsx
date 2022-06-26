import React from "react";

//styles
import * as Styled from "./Image.styles";

//service
import { getAsset } from "services/getAssets";

interface IImageProps {
  imageId: string;
}

const Image = ({ imageId }: IImageProps) => {
  const { asset, assetLoading, assetError } = getAsset(imageId);

  if (assetLoading) return <Styled.ImageWrapper>loading</Styled.ImageWrapper>;
  if (assetError) return <Styled.ImageWrapper>error</Styled.ImageWrapper>;

  return (
    <Styled.ImageWrapper>
      {asset && <img src={asset.imageURL} />}
    </Styled.ImageWrapper>
  );
};

export default Image;
