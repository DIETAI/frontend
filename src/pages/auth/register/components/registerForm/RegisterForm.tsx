import React from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

//schema
import { register_schema } from "./RegisterForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IRegisterSchema } from "./RegisterForm.schema";

//components
import AuthFormContainer from "../../../components/form/container/FormContainer";
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";

//styles
import {
  FormHeading as StylesAuthFormHeading,
  FormAuthLinkWrapper as StyledAuthFormLinkWrapper,
} from "pages/auth/components/form/container/FormContainer.styles";

//translation
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const defaultValues = register_schema.cast({});

const getData = (data: FieldValues) => {
  return new Promise<FieldValues>((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const Form = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(register_schema),
    shouldUnregister: false,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    reset,
  } = methods;

  const onSubmit = async (data: IRegisterSchema) => {
    try {
      const fullName = data.name + " " + data.lastName;
      const registerFormData = {
        ...data,
        fullName,
      };

      const registerData = await axios.post("/api/v1/user", registerFormData, {
        withCredentials: true,
      });

      console.log({ registerData });
      reset();
      navigate("/dashboard/home");
    } catch (e) {
      console.log(e);
      //set error alert
    }

    // await getData(data);
  };

  return (
    <FormProvider {...methods}>
      <AuthFormContainer>
        <StylesAuthFormHeading>
          <h1>{t("register.title")}</h1>
          <p>{t("register.description")}</p>
        </StylesAuthFormHeading>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input name="name" label={t("auth.form.name")} type="text" />
          <Input name="lastName" label={t("auth.form.lastName")} type="text" />
          <Input name="email" label={t("auth.form.email")} type="email" />
          <Input
            name="password"
            label={t("auth.form.password")}
            type="password"
          />
          <Button
            type="submit"
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
          >
            {isSubmitting ? (
              <ReactLoading type="spin" width={20} height={20} />
            ) : (
              t("register.title")
            )}
          </Button>
        </form>

        <StyledAuthFormLinkWrapper>
          <p>{t("login.info")}</p>
          <Link to="/auth/login">
            <a>{t("login.title")}</a>
          </Link>
        </StyledAuthFormLinkWrapper>
      </AuthFormContainer>
    </FormProvider>
  );
};

export default Form;
