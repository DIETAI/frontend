import React from "react";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

//queries
import { getAssets } from "services/getAssets";

//styles
import * as Styled from "./LineView.styles";

//assets
import LogoBackground from "assets/logo-icon.svg";

//icons
import { FaFileAlt, FaInfoCircle, FaEdit, FaTrash } from "icons/icons";
import { IAssetData } from "interfaces/asset.interfaces";

const LineView = ({
  uploadImage,
  assets,
  assetInfo,
  setAssetInfo,
}: {
  uploadImage: () => void;
  assets: IAssetData[];
  assetInfo?: IAssetData;
  setAssetInfo: React.Dispatch<React.SetStateAction<IAssetData | undefined>>;
}) => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  // const { assets, assetsLoading, assetsError } = getAssets();

  // if (assetsLoading) return <div>...loading</div>;
  // if (assetsError) return <div>error</div>;

  return (
    <Styled.LineViewWrapper>
      <Styled.ImageSelectWrapper onClick={uploadImage}>
        <span>
          <FaFileAlt />
        </span>
        <p>wstaw zdjęcie</p>
      </Styled.ImageSelectWrapper>
      {assets &&
        assets.length > 0 &&
        assets.map((asset) => (
          <Styled.ItemWrapper
            key={asset._id}
            selectedItem={selectedAssetId === asset._id}
            onClick={() => selectAssetId(asset._id)}
          >
            <Styled.ItemTitleWrapper>
              <Styled.ImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />
                <img className="itemImg" src={asset.imageURL} />
              </Styled.ImageWrapper>
              <h2>{asset.title}</h2>
            </Styled.ItemTitleWrapper>
            {/* {asset.size && <h3>{fileSizeFormat(asset.size)}</h3>} */}
            <Styled.ItemOptionsWrapper>
              <Styled.ItemOptionWrapper
                optionType="info"
                onClick={() => setAssetInfo(asset)}
              >
                <FaInfoCircle />
              </Styled.ItemOptionWrapper>
              <Styled.ItemOptionWrapper
                optionType="edit"
                // onClick={() => setOpenEditDinnerModal(true)}
              >
                <FaEdit />
              </Styled.ItemOptionWrapper>
              <Styled.ItemOptionWrapper
                optionType="delete"
                // onClick={() => setOpenDeleteDinnerModal(true)}
              >
                <FaTrash />
              </Styled.ItemOptionWrapper>
            </Styled.ItemOptionsWrapper>
          </Styled.ItemWrapper>
        ))}
    </Styled.LineViewWrapper>
  );
};

export default LineView;
