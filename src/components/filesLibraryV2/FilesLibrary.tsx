import React, { useState, useRef, useEffect } from "react";

//form
import { useFormContext } from "react-hook-form";

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
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Image from "components/form/images/image/Image";
import FilesLibraryNav from "./nav/FilesLibraryNav";
import ImageView from "./views/imageView/ImageView";
import LineView from "./views/lineView/LineView";

//services
import { getAssets } from "services/getAssets";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

interface IFilesLibraryProps {
  onSubmitAction: () => void;
  closeModal: () => void;
}

export type View = "image" | "line";

const FilesLibrary = ({ closeModal, onSubmitAction }: IFilesLibraryProps) => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState<View>("image");

  const { assets, assetsLoading, assetsError } = getAssets();
  const [openAddFileForm, setOpenAddFileForm] = useState(false);
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

      {openAddFileForm && (
        <AddFileForm closeForm={() => setOpenAddFileForm(false)} />
      )}

      {selectedAssetId && <p>Wybrano zdjęcie: {selectedAssetId}</p>}
      <p>wykorzystano 0.2/2 GB</p>

      {!openAddFileForm && assets.length < 1 && (
        <Styled.NotFoundFilesWrapper>
          <img src={NoData} />
          <Styled.NotFoundFilesHeading>
            <h2>Nie znaleziono plików</h2>
            <p>dodaj swój pierwszy plik</p>
          </Styled.NotFoundFilesHeading>

          <Button onClick={() => setOpenAddFileForm(true)} variant="primary">
            wstaw plik v2
          </Button>
        </Styled.NotFoundFilesWrapper>
      )}

      {view === "image" && <ImageView uploadImage={uploadImage} />}
      {view === "line" && <LineView uploadImage={uploadImage} />}

      {/* {!openAddFileForm && assets.length > 0 && (
        <Styled.FilesWrapper>
          <ImagesContainer label="zdjęcia">
            <ImageSelect
              icon={<FaFileAlt />}
              text="wstaw plik"
              onClick={uploadImage as () => void}
            />
            {assets.map((asset) => (
              <Styled.ImageWrapper
                key={asset._id}
                onClick={() => selectAssetId(asset._id)}
                selected={selectedAssetId === asset._id}
              >
                <Image imageId={asset._id} />
              </Styled.ImageWrapper>
            ))}
          </ImagesContainer>
        </Styled.FilesWrapper>
      )} */}
    </Styled.FilesLibraryContainer>
  );
};

export default FilesLibrary;
