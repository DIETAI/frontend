import React, { useState } from "react";

//assets
import LogoBackground from "assets/logo-icon.svg";

//queries
import { getAssets } from "services/getAssets";

//styles
import * as Styled from "./ImageView.styles";

//icons
import { FaFileAlt, FaInfoCircle, FaEdit, FaTrash } from "icons/icons";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

//animations
import { AnimatePresence } from "framer-motion";

//interfaces
import { IAssetData } from "interfaces/asset.interfaces";

const ImageView = ({ uploadImage }: { uploadImage: () => void }) => {
  const { assets, assetsLoading, assetsError } = getAssets();

  if (assetsLoading) return <div>...loading</div>;
  if (assetsError) return <div>error</div>;

  return (
    <Styled.ImagesWrapper>
      <Styled.ImageSelectWrapper onClick={uploadImage}>
        <span>
          <FaFileAlt />
        </span>
        <p>wstaw zdjęcie</p>
      </Styled.ImageSelectWrapper>
      {assets && assets.map((asset) => <Image key={asset._id} asset={asset} />)}
    </Styled.ImagesWrapper>
  );
};

const Image = ({ asset }: { asset: IAssetData }) => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openImageOptions, setOpenImageOptions] = useState(false);

  return (
    <Styled.ImageWrapper
      key={asset._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onClick={() => selectAssetId(asset._id)}
      selectedImage={selectedAssetId === asset._id}
      onMouseEnter={() => setOpenImageOptions(true)}
      onMouseLeave={() => setOpenImageOptions(false)}
    >
      <img className="backgroundImg" src={LogoBackground} />
      <img className="itemImg" src={asset.imageURL} />

      <AnimatePresence>
        {openImageOptions && (
          <Styled.ImageOptionsWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Styled.ImageOptionWrapper
              optionType="info"
              // onClick={() => setOpenInfoDinnerModal(true)}
            >
              <FaInfoCircle />
            </Styled.ImageOptionWrapper>
            <Styled.ImageOptionWrapper
              optionType="edit"
              // onClick={() => setOpenEditDinnerModal(true)}
            >
              <FaEdit />
            </Styled.ImageOptionWrapper>
            <Styled.ImageOptionWrapper
              optionType="delete"
              // onClick={() => setOpenDeleteDinnerModal(true)}
            >
              <FaTrash />
            </Styled.ImageOptionWrapper>
          </Styled.ImageOptionsWrapper>
        )}
      </AnimatePresence>
    </Styled.ImageWrapper>
  );
};

export default ImageView;
