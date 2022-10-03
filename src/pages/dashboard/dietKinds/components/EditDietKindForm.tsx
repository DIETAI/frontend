import React, { useState } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";

//styles
import * as Styled from "./DietKindForm.styles";

//form
import {
  useForm,
  FormProvider,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//components
import Input from "components/form/input/Input";
import Autocomplete from "components/form/autocomplete/Autocomplete";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import ImagesContainer from "components/form/images/imagesContainer/ImagesContainer";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Image from "components/form/images/image/Image";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//icons
import { FaUser, FaFileAlt, FaPlus, FaTrash } from "icons/icons";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import { IDietKind, dietKindSchema } from "../schema/dietKind.schema";
import { IDietKindData } from "interfaces/dietKind.interfaces";

const defaultValues = dietKindSchema.cast({});
type IDietKindValues = typeof defaultValues;

const dietKindTypeOptions = [
  { id: 1, name: "lecznicza", type: "healing" },
  { id: 2, name: "niekownecjonalna", type: "unconventional" },
  { id: 3, name: "inna", type: "other" },
];

const EditDietKindForm = ({ dietKind }: { dietKind: IDietKindData }) => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const initialValues = dietKind;

  const methods = useForm({
    resolver: yupResolver(dietKindSchema),
    shouldUnregister: false,
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
    control,
    setValue,
  } = methods;

  const onDietKindFormSubmit = async (data: IDietKindValues) => {
    console.log("wysyłanie rodzaju diety");
    console.log(data);

    try {
      const editDietKind = await axios.put(
        `/api/v1/dietKinds/${dietKind._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editDietKind });
      handleAlert("success", "Edytowano rodzaj diety");
      navigate(`/dashboard/admin/dietKinds/edit/${editDietKind.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie rodzaju diety nie powiodło się");
    }
  };

  return (
    <Styled.FormWrapper grow={true}>
      <Heading icon={<FaFileAlt />} title={dietKind.name} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onDietKindFormSubmit as any)}
          autoComplete="off"
        >
          <Input label="nazwa" name="name" fullWidth />
          <Autocomplete
            label="typ"
            name="type"
            options={dietKindTypeOptions}
            optionLabel="name"
            optionRender="type"
            fullWidth
          />
          <Input textarea label="opis" name="description" fullWidth />

          <Button
            type="submit"
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
            fullWidth
          >
            wyślij
          </Button>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default EditDietKindForm;
