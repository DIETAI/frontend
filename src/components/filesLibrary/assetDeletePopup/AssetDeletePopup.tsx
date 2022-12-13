import React, { useState } from "react";
import { IAssetData } from "interfaces/asset.interfaces";
import { fileSizeFormat } from "../FilesLibrary";
import axios from "utils/api";
import { mutate } from "swr";
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
//styles
import * as Styled from "./AssetDeletePopup.styles";

//components
import Heading from "components/heading/Heading";
import IconButton from "components/iconButton/IconButton";
import Button from "components/form/button/Button";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//icons
import { FaFileAlt, FaEdit, FaTrash, FaTimes } from "icons/icons";

//assets
import LogoBackground from "assets/logo-icon.svg";

const AssetDelete = ({
  asset,
  closePopup,
}: {
  asset: IAssetData;
  closePopup: () => void;
}) => {
  const { handleAlert } = useAlert();
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [deleteItemValue, setDeleteItemValue] = useState("");

  const deleteAsset = async () => {
    try {
      await axios.delete(`/api/v1/assets/${asset._id}`, {
        withCredentials: true,
      });

      handleAlert("success", "Usunięto plik");
      selectAssetId("");
      await mutate(`/api/v1/assets`);
      closePopup();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Usuwanie pliku nie powiodło się");
    }
  };

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

        <h2>
          Czy napewno chcesz usunąć plik <b>{asset.title}</b> ?
        </h2>
        <p>Aby potwierdzić wpisz nazwę obiektu</p>
        <input
          placeholder={asset.title}
          onChange={(e) => setDeleteItemValue(e.currentTarget.value)}
        ></input>

        <Button
          variant={deleteItemValue !== asset.title ? "disabled" : "primary"}
          onClick={deleteAsset as () => void}
        >
          usuń
        </Button>
      </Styled.AssetContentWrapper>
    </Styled.AssetInfoContainer>
  );
};

export default AssetDelete;
