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
        label={`${t("dietEstablishment.form.basic_info.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Input
        label={`${t("dietEstablishment.form.basic_info.description")}`}
        type="text"
        name="description"
        fullWidth
        textarea
      />
      <Input
        label={`${t("dietEstablishment.form.basic_info.kcal")} *`}
        type="number"
        name="kcal"
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dietEstablishment.form.basic_info.addMeasurement")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dietEstablishment.form.basic_info.addFolder")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
      <DashedSelect
        icon={<FaFolderPlus />}
        text={`${t("dietEstablishment.form.basic_info.dietKind")}`}
        onClick={openAddFolderModal}
        fullWidth
      />
    </>
  );
};

export default BasicInfo;
