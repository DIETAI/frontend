import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

//icons
import { FaFolderPlus, FaFolderOpen, FaFileAlt } from "icons/icons";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";
import { IMeasurementInformations } from "pages/dashboard/measurements/schema/newMeasurement.schema";
import Image from "components/form/images/image/Image";
import Calendar from "components/form/calendar/Calendar";
import Autocomplete from "components/form/autocomplete/Autocomplete";

//services
import { getClients } from "services/getClients";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

const genderOptions = [
  { id: 1, name: "mężczyzna", type: "male" },
  { id: 2, name: "kobieta", type: "female" },
];

const Informations = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const { clients, clientsError, clientsLoading } = getClients();

  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const images = watch("images") as IMeasurementInformations["images"];

  const openAddFolderModal = () => {
    console.log("dodaj folder");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseInt(e.currentTarget.value);

    setValue(e.currentTarget.name, value);
  };

  const addImageToForm = () => {
    console.log("changeImg");

    if (!images) {
      setValue("images", [selectedAssetId]);
      return setOpenFileLibrary(false);
    }

    setValue("images", [...images, selectedAssetId]);

    setOpenFileLibrary(false);
  };

  if (clientsLoading) return <div>clients loading</div>;
  if (clientsError) return <div>clients error</div>;

  const clientsData = clients?.map((client) => ({
    _id: client._id,
    fullName: client.name + " " + client.lastName,
  }));

  return (
    <>
      <Input
        label={`${t("measurement.form.informations.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Calendar
        label={`${t("measurement.form.informations.date")} *`}
        name="date"
        fullWidth
      />
      <Autocomplete
        name="client"
        fullWidth
        label={`${t("measurement.form.informations.client")} *`}
        options={clientsData as []}
        optionLabel={"fullName"}
        optionRender={"_id"}
      />
      {/* <Autocomplete
        name="sex"
        fullWidth
        label={`${t("measurement.form.informations.sex")} *`}
        options={genderOptions as []}
        optionLabel={"name"}
        optionRender={"type"}
      /> */}
      {/* <Input
        label={`${t("measurement.form.informations.age")} *`}
        type="number"
        name="age"
        fullWidth
        controlled
        onChange={handleChange}
      /> */}
      <Input
        label={`${t("measurement.form.informations.notes")}`}
        type="text"
        name="notes"
        fullWidth
        textarea
      />
      <ImagesContainer label={`${t("measurement.form.informations.images")}`}>
        <ImageSelect
          icon={<FaFileAlt />}
          text="dodaj zdjęcie"
          onClick={() => setOpenFileLibrary(true)}
        />
        {images && images.map((image) => <Image key={image} imageId={image} />)}
      </ImagesContainer>
      <Modal onClose={() => setOpenFileLibrary(false)} open={openFileLibrary}>
        <FilesLibrary
          onSubmitAction={addImageToForm}
          closeModal={() => setOpenFileLibrary(false)}
        />
      </Modal>

      {/* <p>{`${t("measurement.form.informations.images")}`}</p> */}
    </>
  );
};

export default Informations;
