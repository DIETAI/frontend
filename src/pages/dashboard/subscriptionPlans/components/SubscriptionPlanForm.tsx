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
import {
  ISubscriptionPlan,
  subscriptionPlanSchema,
} from "../schema/subscriptionPlan.schema";

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

const SubscriptionPlanForm = () => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const methods = useForm({
    resolver: yupResolver(subscriptionPlanSchema),
    shouldUnregister: false,
    defaultValues,
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
      const newSubscriptionPlan = await axios.post(
        "/api/v1/subscriptionPlans",
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ newSubscriptionPlan });
      handleAlert("success", "Dodano nowy plan");
      navigate(
        `/dashboard/admin/subscriptionPlans/edit/${newSubscriptionPlan.data._id}`
      );
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie planu nie powiodło się");
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
          onSubmit={handleSubmit(onSubscriptionPlanFormSubmit)}
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

const planTimesOptions = [
  { id: 1, name: "miesiąc", type: "1month" },
  { id: 2, name: "3 miesiące", type: "3months" },
  { id: 3, name: "6 miesięcy", type: "6months" },
];

export const PlanVariant = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "variants",
    });

  const addVariant = () => {
    return append({ name: "", time: "", price: 50 });
  };

  const removeVariant = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Heading icon={<FaFileAlt />} title="Warianty" />
      {fields.length > 0 &&
        fields.map((field, index) => (
          <Styled.FieldWrapper key={field.id}>
            <Styled.FieldHeadWrapper>
              <Styled.FieldNumberWrapper>
                <p>{index + 1}</p>
              </Styled.FieldNumberWrapper>

              <Styled.IconOptionsWrapper>
                <Styled.IconButtonWrapper
                  iconType="delete"
                  type="button"
                  onClick={() => removeVariant(index)}
                >
                  <FaTrash />
                </Styled.IconButtonWrapper>
              </Styled.IconOptionsWrapper>
            </Styled.FieldHeadWrapper>

            <Input
              label="nazwa"
              type="text"
              name={`variants.${index}.name`}
              fullWidth
            />
            <Autocomplete
              label="czas"
              name={`variants.${index}.time`}
              options={planTimesOptions}
              optionLabel="name"
              optionRender="type"
              fullWidth
            />
            <Input
              label="cena"
              type="text"
              name={`variants.${index}.price`}
              fullWidth
            />
            <Input
              label="cena promocyjna"
              type="text"
              name={`variants.${index}.salePrice`}
              fullWidth
            />
          </Styled.FieldWrapper>
        ))}

      <DashedSelect
        icon={<FaPlus />}
        text="dodaj wariant"
        onClick={addVariant}
        fullWidth
      />
    </>
  );
};

export default SubscriptionPlanForm;
