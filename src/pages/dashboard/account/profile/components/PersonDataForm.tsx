import React from "react";
import { useUser } from "services/useUser";
import NoUser from "assets/noUser.svg";

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

//icons
import { FaUser } from "icons/icons";

//images
import DietAILogo from "assets/logo-icon.svg";
import AvatarImg from "assets/avatar.png";

//interfaces
import { IPersonData } from "../schema/personData.schema";

const defaultValues = personDataSchema.cast({});

const PersonDataForm = () => {
  const { user } = useUser();

  const initialValues: IPersonData = {
    ...defaultValues,
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatar: user?.avatar || NoUser,
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
    watch,
  } = methods;

  const onPersonDataFormSubmit = async (data: FieldValues) => {
    //   return new Promise<FieldValues>((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(data);
    //     }, 300);
    //   });

    console.log("data");
  };

  return (
    <Styled.FormWrapper grow={true}>
      <Heading icon={<FaUser />} title="Twoje dane" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onPersonDataFormSubmit)}>
          <Styled.ImageWrapper>
            <img src={DietAILogo} className="personData-backgroundImage" />
            <img
              src={initialValues.avatar}
              className="personData-avatarImage"
            />
          </Styled.ImageWrapper>
          <Input label="imię" name="name" fullWidth />
          <Input label="nazwisko" name="lastName" fullWidth />
          <Input label="email" name="email" fullWidth disabled />
          <Input label="nr telefonu" name="phone" fullWidth />
          {/* <Input label="rola" name="role" fullWidth /> */}
          {/* <Input
            label="metoda uwierzytelniania"
            name="authProvider"
            fullWidth
          /> */}
          {/* <p>logo</p> */}
          <Button
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            fullWidth
          >
            wyślij
          </Button>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default PersonDataForm;
