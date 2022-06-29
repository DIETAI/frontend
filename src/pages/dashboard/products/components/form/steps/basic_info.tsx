import React, { useState } from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";

//interfaces
import { IProductBasicInfo } from "../../../schema/productFormSchema";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

//form
import { useFormContext } from "react-hook-form";

//components
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import Image from "components/form/images/image/Image";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";

//icons
import { FaFileAlt } from "icons/icons";

const season = [
  { id: 1, name: "zima" },
  { id: 2, name: "wiosna" },
  { id: 3, name: "lato" },
  { id: 4, name: "jesień" },
];

const BasicInfo = () => {
  const { t } = useTranslation();
  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  return (
    <>
      <Input
        label={`${t("product.form.basic_info.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Input
        label={`${t("product.form.basic_info.description")}`}
        type="text"
        name="description"
        fullWidth
        textarea
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("product.form.basic_info.addFolder")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("product.form.basic_info.group")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("product.form.basic_info.dietKind")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("product.form.basic_info.tags")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <ProductMainImage />
      <ProductGallery />
    </>
  );
};

const ProductMainImage = () => {
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
      <ImagesContainer label={`${t("product.form.basic_info.image")}`}>
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

const ProductGallery = () => {
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

  const gallery = watch("gallery") as IProductBasicInfo["gallery"];

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
      <ImagesContainer label={`${t("product.form.basic_info.gallery")}`}>
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
