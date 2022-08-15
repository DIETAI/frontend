import React, { useState } from "react";

//components
import Input from "components/form/input/Input";
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Modal from "components/modal/Modal";
import Image from "components/form/images/image/Image";
import FilesLibrary from "components/filesLibrary/FilesLibrary";

//icons
import { FaFileAlt } from "icons/icons";

//styles
import * as Styled from "./BasicInfo.styles";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useFormContext } from "react-hook-form";

const BasicInfo = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const openAvatarModal = () => {
    console.log("open modal");
  };

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const image = watch("image") as string;

  const addMainImage = () => {
    console.log("changeImg");

    setValue("image", selectedAssetId);
    return setOpenFileLibrary(false);
  };

  return (
    <>
      <ImagesContainer label="zdjęcie">
        {image && <Image imageId={image} />}
        <ImageSelect
          icon={<FaFileAlt />}
          onClick={() => setOpenFileLibrary(true)}
          text="dodaj zdjęcie"
        />
      </ImagesContainer>

      <Input type="text" name="name" label="imię" fullWidth />
      <Input type="text" name="lastName" label="nazwisko" fullWidth />
      <Input type="email" name="email" label="email" fullWidth />
      <Input type="text" name="phone" label="numer telefonu" fullWidth />
      <Input type="text" name="dateOfBirth" label="data urodzenia" fullWidth />
      <Input
        type="text"
        name="onLineAccount"
        label="online account"
        fullWidth
      />
      <p>avatar</p>
      <p>online account</p>
      <Input type="text" name="street" label="ulica" fullWidth />
      <Input type="text" name="zipCode" label="kod pocztowy" fullWidth />
      <Input type="text" name="city" label="miasto" fullWidth />
      <Input type="text" name="notes" label="notatki" fullWidth textarea />
      <Modal onClose={() => setOpenFileLibrary(false)} open={openFileLibrary}>
        <FilesLibrary
          onSubmitAction={addMainImage}
          closeModal={() => setOpenFileLibrary(false)}
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
