import React from "react";
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import { FaFolderPlus, FaFolderOpen } from "icons/icons";
import { useTranslation } from "react-i18next";

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
      <p>{`${t("product.form.basic_info.image")}`}</p>
      <p>{`${t("product.form.basic_info.gallery")}`}</p>
    </>
  );
};

export default BasicInfo;
