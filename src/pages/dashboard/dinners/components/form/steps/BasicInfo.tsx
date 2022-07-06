import React, { useState } from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useFormContext } from "react-hook-form";

//components
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Image from "components/form/images/image/Image";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";

//icons
import { FaFileAlt } from "icons/icons";

//interfaces
import { IBasicInfo } from "../../../schema/newDinner.schema";

const BasicInfo = () => {
  const { t } = useTranslation();

  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  return (
    <>
      <Input
        label={`${t("dinner.form.basic_info.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Input
        label={`${t("dinner.form.basic_info.description")}`}
        type="text"
        name="description"
        fullWidth
        textarea
      />
      <Input
        label={`${t("dinner.form.basic_info.recipe")}`}
        type="text"
        name="recipe"
        fullWidth
        textarea
      />

      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.mealTypes")}`} //breakfast, dinner etc..
        onClick={openAddFolderModal}
        fullWidth
      />
      {/* <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.mealTypesKind")}`} //mainCourse, dinner etc..
        onClick={openAddFolderModal}
        fullWidth
      /> */}
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.tags")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.dietKinds")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.tags")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.preparation_time")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DinnerMainImage />
      <DinnerGallery />
    </>
  );
};

const DinnerMainImage = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const { t } = useTranslation();
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
      <ImagesContainer label={`${t("dinner.form.basic_info.image")}`}>
        {image && <Image imageId={image} />}
        <ImageSelect
          icon={<FaFileAlt />}
          text="dodaj zdjęcie"
          onClick={() => setOpenFileLibrary(true)}
        />
      </ImagesContainer>
      <Modal onClose={() => setOpenFileLibrary(false)} open={openFileLibrary}>
        <FilesLibrary
          onSubmitAction={addMainImage}
          closeModal={() => setOpenFileLibrary(false)}
        />
      </Modal>
    </>
  );
};

const DinnerGallery = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const gallery = watch("gallery") as IBasicInfo["gallery"];

  const addGalleryImg = () => {
    console.log("changeImg");

    if (!gallery) {
      setValue("gallery", [selectedAssetId]);
      return setOpenFileLibrary(false);
    }

    setValue("gallery", [...gallery, selectedAssetId]);
    setOpenFileLibrary(false);
  };

  return (
    <>
      <ImagesContainer label={`${t("dinner.form.basic_info.gallery")}`}>
        {gallery &&
          gallery.map((image) => <Image key={image} imageId={image} />)}
        <ImageSelect
          icon={<FaFileAlt />}
          text="dodaj zdjęcie"
          onClick={() => setOpenFileLibrary(true)}
        />
      </ImagesContainer>
      <Modal onClose={() => setOpenFileLibrary(false)} open={openFileLibrary}>
        <FilesLibrary
          onSubmitAction={addGalleryImg}
          closeModal={() => setOpenFileLibrary(false)}
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
