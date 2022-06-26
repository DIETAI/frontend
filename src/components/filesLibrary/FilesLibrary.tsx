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

//services
import { getAssets } from "services/getAssets";
import { IMeasurementInformations } from "pages/dashboard/measurements/schema/newMeasurement.schema";

interface IFilesLibraryProps {
  closeModal: () => void;
}

const FilesLibrary = ({ closeModal }: IFilesLibraryProps) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { assets, assetsLoading, assetsError } = getAssets();
  const [openAddFileForm, setOpenAddFileForm] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (assetsLoading) return <div>assets loading...</div>;
  if (assetsError || !assets) return <div>assets error</div>;

  // useEffect(() => {
  //   if (imageUpload) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(imageUpload);
  //   } else {
  //     setPreview(null);
  //   }
  // }, [imageUpload]);

  const images = getValues("images") as IMeasurementInformations["images"];

  const uploadImage = () => {
    setOpenAddFileForm(true);
  };

  const addImageToForm = () => {
    console.log("changeImg");

    if (!images) {
      setValue("images", [selectedImageId]);
      return closeModal();
    }

    setValue("images", [...images, selectedImageId]);

    closeModal();
  };

  return (
    <Styled.FilesLibraryContainer>
      <Heading
        icon={<FaFileAlt />}
        title={"Pliki"}
        // description={t("verify.role.modal.description")}
      />

      <Button
        variant={!selectedImageId ? "disabled" : "primary"}
        onClick={addImageToForm}
      >
        dodaj zdjęcie
      </Button>

      {openAddFileForm && (
        <AddFileForm closeForm={() => setOpenAddFileForm(false)} />
      )}

      {!openAddFileForm && assets.length < 1 && (
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
      {!openAddFileForm && assets.length > 0 && (
        <Styled.FilesWrapper>
          <ImagesContainer label="zdjęcia">
            {assets.map((asset) => (
              <Styled.ImageWrapper
                key={asset._id}
                onClick={() => setSelectedImageId(asset._id)}
                selected={selectedImageId === asset._id}
              >
                <Image imageId={asset._id} />
              </Styled.ImageWrapper>
            ))}
            <ImageSelect
              icon={<FaFileAlt />}
              text="wstaw plik"
              onClick={uploadImage as () => void}
            />
          </ImagesContainer>
        </Styled.FilesWrapper>
      )}
    </Styled.FilesLibraryContainer>
  );
};

export default FilesLibrary;
