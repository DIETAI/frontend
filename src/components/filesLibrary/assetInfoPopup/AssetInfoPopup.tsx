import { IAssetData } from "interfaces/asset.interfaces";
import React from "react";
import { fileSizeFormat } from "../FilesLibrary";

//styles
import * as Styled from "./AssetInfoPopup.styles";

//components
import Heading from "components/heading/Heading";
import IconButton from "components/iconButton/IconButton";

//icons
import { FaFileAlt, FaEdit, FaTrash, FaTimes } from "icons/icons";

//assets
import LogoBackground from "assets/logo-icon.svg";

const AssetInfo = ({
  asset,
  closePopup,
}: {
  asset: IAssetData;
  closePopup: () => void;
}) => {
  return (
    <Styled.AssetInfoContainer>
      <Styled.AssetContentWrapper>
        <Styled.AssetHeadingWrapper>
          <Heading icon={<FaFileAlt />} title={"Plik"} />
          <IconButton icon={<FaTimes />} onClick={closePopup} />
        </Styled.AssetHeadingWrapper>

        <Styled.ImageWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img className="backgroundImg" src={LogoBackground} />
          <img className="itemImg" src={asset.imageURL} />
        </Styled.ImageWrapper>

        <p>
          nazwa: <b>{asset.title}</b>{" "}
        </p>
        <p>opis: {asset.description || "-"}</p>
        <p>rozmiar: {fileSizeFormat(asset.size)}</p>

        <Styled.AssetInfoOptionsWrapper>
          <Styled.AssetInfoOption
            optionType="edit"
            type="button"
            // onClick={() => navigate(`/dashboard/Assets/edit/${Asset._id}`)}
          >
            <span>
              <FaEdit />
            </span>
            edytuj
          </Styled.AssetInfoOption>

          <Styled.AssetInfoOption
            optionType="delete"
            type="button"
            // onClick={() => setOpenDeleteModal(true)}
          >
            <span>
              <FaTrash />
            </span>
            usuń
          </Styled.AssetInfoOption>
        </Styled.AssetInfoOptionsWrapper>
      </Styled.AssetContentWrapper>
    </Styled.AssetInfoContainer>
  );
};

export default AssetInfo;
