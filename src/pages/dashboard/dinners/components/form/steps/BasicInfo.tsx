import React, { useState } from "react";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useFormContext } from "react-hook-form";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Image from "components/form/images/image/Image";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";
import MultipleAutocomplete from "components/form/multipleAutocomplete/MultipleAutocomplete";
import MyEditor from "./editor/Editor";

//icons
import { FaFileAlt } from "icons/icons";

//interfaces
import { IBasicInfo } from "../../../schema/newDinner.schema";
import Autocomplete from "components/form/autocomplete/Autocomplete";

const mealTypeOptions = [
  { id: 1, name: "Śniadanie", type: "breakfast" },
  { id: 2, name: "II Śniadanie", type: "second_breakfast" },
  { id: 3, name: "Obiad", type: "lunch" },
  { id: 4, name: "Przekąska", type: "snack" },
  { id: 5, name: "Kolacja", type: "dinner" },
];

const mealTypeKindOptions = [
  { id: 1, name: "danie główne", type: "mainCourse" },
  { id: 2, name: "zupa", type: "soup" },
  { id: 3, name: "napój", type: "drink" },
];

const tagOptions = [
  { id: 1, name: "bezglutenu", type: "nogluten" },
  { id: 2, name: "bezlaktozy", type: "lactose-free" },
];

export const preparationTimeOptions = [
  { id: 1, name: "do 5 minut", type: "5m-less" },
  { id: 3, name: "do 10 minut", type: "10m-less" },
  { id: 4, name: "do 15 minut", type: "15m-less" },
  { id: 5, name: "do 20 minut", type: "20m-less" },
  { id: 6, name: "do 30 minut", type: "30m-less" },
  { id: 7, name: "do 40 minut", type: "40m-less" },
  { id: 8, name: "do 50 minut", type: "50m-less" },
  { id: 9, name: "do 1 godziny", type: "1h-less" },
  { id: 10, name: "do 1.5 godziny", type: "1.5h-less" },
  { id: 11, name: "do 2 godzin", type: "2h-less" },
  { id: 12, name: "do 2.5 godziny", type: "2.5h-less" },
  { id: 13, name: "do 3 godzin", type: "3h-less" },
  { id: 14, name: "do 4 godzin", type: "4h-less" },
  { id: 15, name: "do 5 godzin", type: "5h-less" },
  { id: 16, name: "do 6 godzin", type: "6h-less" },
  { id: 17, name: "do 7 godzin", type: "7h-less" },
  { id: 18, name: "do 8 godzin", type: "8h-less" },
  { id: 19, name: "do 9 godzin", type: "9h-less" },
  { id: 20, name: "do 10 godzin", type: "10h-less" },
  { id: 21, name: "powyżej 10 godzin", type: "10h-more" },
];

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
      {/* <MyEditor /> */}
      <Autocomplete
        name="preparation_time"
        label={`${t("dinner.form.basic_info.preparation_time")}`}
        options={preparationTimeOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />

      <MultipleAutocomplete
        name="mealTypes"
        label={`${t("dinner.form.basic_info.mealTypes")}`}
        options={mealTypeOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />
      <Autocomplete
        name="mealTypesKind"
        label="typ dania"
        options={mealTypeKindOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />
      <MultipleAutocomplete
        name="tags"
        label={`${t("dinner.form.basic_info.tags")}`}
        options={tagOptions}
        optionLabel="name"
        optionRender="type"
        fullWidth
      />

      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.dietKinds")}`}
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
