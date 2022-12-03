import React, { useState } from "react";
import { useUser } from "services/useUser";
import NoUser from "assets/noUser.svg";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

//styles
import * as Styled from "../styles/Form.styles";

//form
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema
import { personDataSchema } from "../schema/personData.schema";

//components
import Input from "components/form/textarea/Textarea";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import Modal from "components/modal/Modal";
import FilesLibrary from "components/filesLibrary/FilesLibrary";

//icons
import { FaUser } from "icons/icons";

//images
import DietAILogo from "assets/logo-icon.svg";
import AvatarImg from "assets/avatar.png";

//interfaces
import { IPersonData } from "../schema/personData.schema";

const defaultValues = personDataSchema.cast({});

const PersonDataForm = () => {
  const { selectAssetId, selectedAssetId } = useFileLibrary();
  const [openFileLibrary, setOpenFileLibrary] = useState(false);

  const { handleAlert } = useAlert();
  const { user } = useUser();

  const initialValues: IPersonData = {
    ...defaultValues,
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    photoURL: user?.avatar || NoUser,
  };

  const methods = useForm({
    resolver: yupResolver(personDataSchema),
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
    setValue,
    watch,
  } = methods;

  const onPersonDataFormSubmit = async (data: FieldValues) => {
    const editUserData = {
      ...data,
      fullName: data.name + " " + data.lastName,
    };

    console.log({ editUserData });

    try {
      const editUser = await axios.put(`/api/v1/user`, editUserData, {
        withCredentials: true,
      });

      console.log({ editUser });
      handleAlert("success", "Zaktualizowano dane");
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie danych nie powiodło się");
    }

    console.log("data");
  };

  const handleOpenFileLibrary = () => {
    setOpenFileLibrary(true);
  };

  const addMainImage = () => {
    console.log("changeImg");

    setValue("photoURL", selectedAssetId);
    return setOpenFileLibrary(false);
  };

  return (
    <>
      <Styled.FormWrapper grow={true}>
        <Heading icon={<FaUser />} title="Twoje dane" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onPersonDataFormSubmit)}>
            {/* {JSON.stringify(watch())} */}
            <Styled.ImageWrapper>
              <img src={DietAILogo} className="personData-backgroundImage" />
              <Styled.ImageSelectWrapper onClick={handleOpenFileLibrary}>
                <img
                  src={initialValues.photoURL}
                  className="personData-avatarImage"
                />
              </Styled.ImageSelectWrapper>
            </Styled.ImageWrapper>
            <Input label="imię" name="name" fullWidth />
            <Input label="nazwisko" name="lastName" fullWidth />
            <Input label="email" name="email" fullWidth disabled />
            {/* <Input label="nr telefonu" name="phone" fullWidth /> */}
            {/* <Input label="rola" name="role" fullWidth /> */}
            {/* <Input
            label="metoda uwierzytelniania"
            name="authProvider"
            fullWidth
          /> */}
            {/* <p>logo</p> */}
            <Button
              type="submit"
              variant={!isValid || isSubmitting ? "disabled" : "primary"}
              fullWidth
            >
              wyślij
            </Button>
          </form>
        </FormProvider>
      </Styled.FormWrapper>
      <Modal onClose={() => setOpenFileLibrary(false)} open={openFileLibrary}>
        <FilesLibrary
          onSubmitAction={addMainImage}
          closeModal={() => setOpenFileLibrary(false)}
        />
      </Modal>
    </>
  );
};

export default PersonDataForm;
