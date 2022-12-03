import React from "react";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { getAsset } from "services/getAssets";

//styles
import * as Styled from "./SelectedAsset.styles";

//assets
import LogoBackground from "assets/logo-icon.svg";

const SelectedAsset = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  if (!selectedAssetId) return null;

  const { asset, assetLoading, assetError } = getAsset(selectedAssetId);

  if (!asset) return null;

  return (
    <Styled.SelectedAssetWrapper>
      <span>wybrano:</span>
      <Styled.ItemTitleWrapper>
        <Styled.ImageWrapper>
          <img className="backgroundImg" src={LogoBackground} />
          <img className="itemImg" src={asset.imageURL} />
        </Styled.ImageWrapper>
        <h2>{asset.title}</h2>
      </Styled.ItemTitleWrapper>
    </Styled.SelectedAssetWrapper>
  );
};

export default SelectedAsset;
