import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Modal from "components/modal/Modal";
import Image from "components/form/images/image/Image";
import FilesLibrary from "components/filesLibrary/FilesLibrary";
import Autocomplete from "components/form/autocomplete/Autocomplete";
import Calendar from "./calendar/Calendar";

//icons
import { FaFileAlt } from "icons/icons";

//styles
import * as Styled from "./BasicInfo.styles";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useFormContext } from "react-hook-form";
import { IClientBasicInfo } from "pages/dashboard/clients/schema/newClient.schema";

const genderOptions = [
  { id: 1, name: "mężczyzna", type: "male" },
  { id: 2, name: "kobieta", type: "female" },
];

const physiologicalStateOptions = [
  { id: 1, name: "brak", type: "lack" },
  { id: 2, name: "ciąża", type: "pregnancy" },
  { id: 3, name: "laktacja", type: "lactation" },
];

const BasicInfo = () => {
  const { t } = useTranslation();
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
  const gender = watch("gender") as IClientBasicInfo["gender"];

  const addMainImage = () => {
    console.log("changeImg");

    setValue("image", selectedAssetId);
    return setOpenFileLibrary(false);
  };

  return (
    <>
      <ImagesContainer label={`${t("client.form.basic_info.avatar")}`}>
        {image && <Image imageId={image} />}
        <ImageSelect
          icon={<FaFileAlt />}
          onClick={() => setOpenFileLibrary(true)}
          text={`${t("client.form.basic_info.avatar")}`}
        />
      </ImagesContainer>

      <Input
        type="text"
        name="name"
        label={`${t("client.form.basic_info.name")} *`}
        fullWidth
      />
      <Input
        type="text"
        name="lastName"
        label={`${t("client.form.basic_info.lastName")} *`}
        fullWidth
      />
      <Calendar
        label={`${t("client.form.basic_info.dateOfBirth")} *`}
        name="dateOfBirth"
        fullWidth
      />
      <Autocomplete
        name="gender"
        fullWidth
        label={`${t("client.form.basic_info.gender")} *`}
        options={genderOptions}
        optionLabel={"name"}
        optionRender={"type"}
      />
      {gender === "female" && (
        <Autocomplete
          name="physiologicalState"
          fullWidth
          label={`${t("client.form.basic_info.physiologicalState")} *`}
          options={physiologicalStateOptions}
          optionLabel={"name"}
          optionRender={"type"}
        />
      )}

      <Input
        type="email"
        name="email"
        label={`${t("client.form.basic_info.email")}`}
        fullWidth
      />
      <Input
        type="text"
        name="phone"
        label={`${t("client.form.basic_info.phoneNumber")}`}
        fullWidth
      />
      {/* <Input
        type="text"
        name="onLineAccount"
        label="online account"
        fullWidth
      /> */}
      {/* <p>online account</p> */}
      <Input
        type="text"
        name="street"
        label={`${t("client.form.basic_info.street")}`}
        fullWidth
      />
      <Input
        type="text"
        name="zipCode"
        label={`${t("client.form.basic_info.zipCode")}`}
        fullWidth
      />
      <Input
        type="text"
        name="city"
        label={`${t("client.form.basic_info.city")}`}
        fullWidth
      />
      <Input
        type="text"
        name="notes"
        label={`${t("client.form.basic_info.notes")}`}
        fullWidth
        textarea
      />
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
