import React, { useState } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";

//styles
import * as Styled from "./SubscriptionPlanForm.styles";

//form
import {
  useForm,
  FormProvider,
  FieldValues,
  useFieldArray,
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
import { PlanVariant } from "./SubscriptionPlanForm";

//icons
import { FaUser, FaFileAlt, FaPlus, FaTrash } from "icons/icons";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  ISubscriptionPlan,
  subscriptionPlanSchema,
} from "../schema/subscriptionPlan.schema";
import { ISubscriptionPlanData } from "interfaces/subscriptionPlan.interfaces";

const defaultValues = subscriptionPlanSchema.cast({});
type ISubscriptionPlanValues = typeof defaultValues;

const subscriptionPlanNameOptions = [
  { id: 1, name: "test" },
  { id: 2, name: "standard" },
  { id: 3, name: "pro" },
  { id: 4, name: "vip" },
];

const subscriptionPlanRoleOptions = [
  { id: 1, role: "admin" },
  { id: 2, role: "patient" },
  { id: 3, role: "dietetic" },
  { id: 4, role: "personal" },
];

interface IEditSubscriptionPlanProps {
  subscriptionPlan: ISubscriptionPlanData;
}

const SubscriptionPlanForm = ({
  subscriptionPlan,
}: IEditSubscriptionPlanProps) => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const initialValues = subscriptionPlan;

  const methods = useForm({
    resolver: yupResolver(subscriptionPlanSchema),
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

  const {
    fields: featuresFields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    update,
  } = useFieldArray({
    control,
    name: "features",
  });

  const image = watch("image");

  const addFeature = () => {
    return append({ name: "" });
  };

  const removeFeature = (index: number) => {
    remove(index);
  };

  const onSubscriptionPlanFormSubmit = async (
    data: ISubscriptionPlanValues
  ) => {
    console.log("wysyłanie planu");
    console.log(data);

    try {
      const editSubscriptionPlan = await axios.put(
        `/api/v1/subscriptionPlans/${subscriptionPlan._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editSubscriptionPlan });
      handleAlert("success", "Edytowano plan");
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie planu nie powiodło się");
    }
  };

  const changeImage = () => {
    console.log("changeImg");

    setValue("image", selectedAssetId);
    return setOpenFileLibrary(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    setValue(e.currentTarget.name as any, value);
  };

  return (
    <Styled.FormWrapper grow={true}>
      <Heading icon={<FaFileAlt />} title="Nowy plan" />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubscriptionPlanFormSubmit as any)}
          autoComplete="off"
        >
          <Autocomplete
            label="nazwa planu"
            name="name"
            options={subscriptionPlanNameOptions}
            optionLabel="name"
            optionRender="name"
            fullWidth
          />
          <Autocomplete
            label="rola"
            name="role"
            options={subscriptionPlanRoleOptions}
            optionLabel="role"
            optionRender="role"
            fullWidth
          />
          <ImagesContainer label="zdjęcie">
            <ImageSelect
              icon={<FaFileAlt />}
              text="dodaj zdjęcie"
              onClick={() => setOpenFileLibrary(true)}
            />
            {image && <Image imageId={image} />}
          </ImagesContainer>
          <Input
            textarea
            label="krótki opis"
            name="shortDescription"
            fullWidth
          />
          <Input textarea label="opis" name="description" fullWidth />
          <Input
            controlled
            onChange={handleChange}
            type="number"
            label="cena"
            name="price"
            fullWidth
          />
          <Input
            controlled
            onChange={handleChange}
            type="number"
            label="cena promocyjna"
            name="salePrice"
            fullWidth
          />
          <PlanVariant />
          <>
            <Heading icon={<FaFileAlt />} title="Właściwości" />
            {featuresFields.length > 0 &&
              featuresFields.map((field, index) => (
                <Styled.FieldWrapper key={field.id}>
                  <Styled.FieldHeadWrapper>
                    <Styled.FieldNumberWrapper>
                      <p>{index + 1}</p>
                    </Styled.FieldNumberWrapper>

                    <Styled.IconOptionsWrapper>
                      <Styled.IconButtonWrapper
                        iconType="delete"
                        type="button"
                        onClick={() => removeFeature(index)}
                      >
                        <FaTrash />
                      </Styled.IconButtonWrapper>
                    </Styled.IconOptionsWrapper>
                  </Styled.FieldHeadWrapper>

                  <Input
                    label="nazwa"
                    type="text"
                    name={`features.${index}.name`}
                    fullWidth
                  />
                </Styled.FieldWrapper>
              ))}

            <DashedSelect
              icon={<FaPlus />}
              text="dodaj właściwość"
              onClick={addFeature}
              fullWidth
            />
          </>

          <Button
            type="submit"
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
            fullWidth
          >
            wyślij
          </Button>

          <Modal
            onClose={() => setOpenFileLibrary(false)}
            open={openFileLibrary}
          >
            <FilesLibrary
              onSubmitAction={changeImage}
              closeModal={() => setOpenFileLibrary(false)}
            />
          </Modal>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default SubscriptionPlanForm;
