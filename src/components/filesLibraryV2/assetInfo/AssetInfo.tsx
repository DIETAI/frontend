import { IAssetData } from "interfaces/asset.interfaces";
import React from "react";

//styles
import * as Styled from "./AssetInfo.styles";

const AssetInfo = ({ asset }: { asset: IAssetData }) => {
  return (
    <Styled.AssetInfoContainer>
      <Styled.AssetContentWrapper>
        <p>nazwa: {asset.title}</p>
        <p>key: {asset.key}</p>
        <p>size: {asset.size}</p>
      </Styled.AssetContentWrapper>
    </Styled.AssetInfoContainer>
  );
};

export default AssetInfo;
