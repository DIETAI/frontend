import React from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";

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
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dinner.form.basic_info.mealTypesKind")}`} //mainCourse, dinner etc..
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
      <p>{`${t("dinner.form.basic_info.image")}`}</p>
      <p>{`${t("dinner.form.basic_info.gallery")}`}</p>
    </>
  );
};

export default BasicInfo;
