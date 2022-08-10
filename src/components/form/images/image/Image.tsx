import React from "react";

//styles
import * as Styled from "./Image.styles";

//service
import { getAsset } from "services/getAssets";

//icons
import { FaFileAlt } from "icons/icons";

export interface IImageProps {
  imageId: string;
  roundedDataGrid?: boolean;
  roundedSelect?: boolean;
}

const Image = ({ imageId, roundedDataGrid, roundedSelect }: IImageProps) => {
  const { asset, assetLoading, assetError } = getAsset(imageId);

  if (assetLoading)
    return (
      <Styled.ImageWrapper roundedDataGrid={roundedDataGrid}>
        <FaFileAlt />
      </Styled.ImageWrapper>
    );
  if (assetError) return <Styled.ImageWrapper>error</Styled.ImageWrapper>;

  return (
    <Styled.ImageWrapper
      roundedDataGrid={roundedDataGrid}
      roundedSelect={roundedSelect}
    >
      {asset && <img src={asset.imageURL} />}
    </Styled.ImageWrapper>
  );
};

export default Image;
