import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  defaultRegisterUserInputData,
  registerUserSchema,
} from "./RegisterForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

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

//services
import { loginUser, registerUser } from "services/user.service";

//types
import { IRegisterUserInputData } from "interfaces/user.interfaces";

const Form = () => {
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(registerUserSchema),
    shouldUnregister: false,
    defaultValues: defaultRegisterUserInputData,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const onSubmit = async (data: IRegisterUserInputData) => {
    try {
      const fullName = data.name + " " + data.lastName;
      const registerFormData = {
        ...data,
        fullName,
      };

      const newUser = await registerUser(data);

      const session = await loginUser({
        email: data.email,
        password: data.password,
      });

      handleAlert("success", "Utworzono konto");

      navigate("/dashboard/home");
      reset();
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 409) {
          return handleAlert(
            "error",
            "Istnieje już użytkownik o podanym adresie e-mail"
          );
        }
      }

      handleAlert("error", "Wystąpił błąd podczas rejestracji");
    }
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
          <Link to="/auth/login">{t("login.title")}</Link>
        </StyledAuthFormLinkWrapper>
      </AuthFormContainer>
    </FormProvider>
  );
};

export default Form;
