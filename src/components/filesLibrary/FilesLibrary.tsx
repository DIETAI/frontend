import React, { useState, useRef, useEffect } from "react";

//styles
import * as Styled from "./FilesLibrary.styles";

//components
import Heading from "components/heading/Heading";

//icons
import { FaFileAlt } from "icons/icons";

//images
import NoData from "assets/noData.svg";

//components
import Button from "components/form/button/Button";
import AddFileForm from "./addFileForm/AddFileForm";
import EditFileForm from "./editFileForm/EditFileForm";
import FilesLibraryNav from "./nav/FilesLibraryNav";
import ImageView from "./views/imageView/ImageView";
import LineView from "./views/lineView/LineView";
import SelectedAsset from "./selectedAsset/SelectedAsset";
import AssetInfoPopup from "./assetInfoPopup/AssetInfoPopup";
import AssetDeletePopup from "./assetDeletePopup/AssetDeletePopup";

//services
import { getAssets } from "services/getAssets";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { IAssetData } from "interfaces/asset.interfaces";

interface IFilesLibraryProps {
  onSubmitAction: () => void;
  closeModal: () => void;
}

// interface IFileSizeFormat {
//   bytes: number;
//   si: boolean;
//   dp: number;
// }

export const maxImagesSize = 2000000000; //2GB

export const fileSizeFormat = (bytes: number, si = true, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
};

export const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

export const sumImagesSize = (assets: IAssetData[]) => {
  const imageSize = roundValue(
    assets.reduce((acc, asset) => acc + Number(asset.size), 0)
  );

  return imageSize;
};

const search = (currentData: IAssetData[], query: string) => {
  const dataFilter = currentData.filter(
    (row) => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  );

  return dataFilter;
};

export type View = "image" | "line";

const FilesLibrary = ({ closeModal, onSubmitAction }: IFilesLibraryProps) => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState<View>("image");
  const [assetInfo, setAssetInfo] = useState<IAssetData>();
  const [assetDelete, setAssetDelete] = useState<IAssetData>();

  const { assets, assetsLoading, assetsError } = getAssets();
  const [openAddFileForm, setOpenAddFileForm] = useState<boolean>(false);
  const [openEditFileForm, setOpenEditFileForm] = useState<IAssetData>();
  const [selectedImageId, setSelectedImageId] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (assetsLoading) return <div>assets loading...</div>;
  if (assetsError || !assets) return <div>assets error</div>;

  const uploadImage = () => {
    setOpenAddFileForm(true);
  };

  return (
    <Styled.FilesLibraryContainer>
      <Heading icon={<FaFileAlt />} title={"Pliki"} />

      <FilesLibraryNav
        onSubmitAction={onSubmitAction}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        view={view}
        setView={setView}
      />

      <Styled.HeaderWrapper>
        <Styled.NavInfoWrapper>
          <span>
            razem: <b>{assets.length}</b>
          </span>

          <p>
            <b>{fileSizeFormat(sumImagesSize(assets))}</b>/2.0 GB
          </p>
        </Styled.NavInfoWrapper>

        <SelectedAsset />
      </Styled.HeaderWrapper>

      {assets.length < 1 && (
        <Styled.NotFoundFilesWrapper>
          <img src={NoData} />
          <Styled.NotFoundFilesHeading>
            <h2>Nie znaleziono plików</h2>
            <p>dodaj swój pierwszy plik</p>
          </Styled.NotFoundFilesHeading>

          <Button onClick={() => setOpenAddFileForm(true)} variant="primary">
            wstaw plik
          </Button>
        </Styled.NotFoundFilesWrapper>
      )}

      {assets.length > 0 && (
        <>
          {view === "image" && (
            <ImageView
              assets={search(assets, searchValue)}
              uploadImage={uploadImage}
              assetInfo={assetInfo}
              setAssetInfo={setAssetInfo}
              assetDelete={assetDelete}
              setAssetDelete={setAssetDelete}
              editAssetFormOpen={openEditFileForm}
              setEditAssetFormOpen={setOpenEditFileForm}
            />
          )}
          {view === "line" && (
            <LineView
              assets={search(assets, searchValue)}
              uploadImage={uploadImage}
              assetInfo={assetInfo}
              setAssetInfo={setAssetInfo}
              assetDelete={assetDelete}
              setAssetDelete={setAssetDelete}
              editAssetFormOpen={openEditFileForm}
              setEditAssetFormOpen={setOpenEditFileForm}
            />
          )}
        </>
      )}

      {openAddFileForm && (
        <AddFileForm
          closeForm={() => setOpenAddFileForm(false)}
          assets={assets}
        />
      )}

      {openEditFileForm && (
        <EditFileForm
          closeForm={() => setOpenEditFileForm(undefined)}
          assets={assets}
          editAsset={openEditFileForm}
        />
      )}

      {assetInfo && (
        <AssetInfoPopup
          closePopup={() => setAssetInfo(undefined)}
          asset={assetInfo}
          setAssetDelete={setAssetDelete}
        />
      )}

      {assetDelete && (
        <AssetDeletePopup
          closePopup={() => setAssetDelete(undefined)}
          asset={assetDelete}
        />
      )}
    </Styled.FilesLibraryContainer>
  );
};

export default FilesLibrary;
