import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axiosInstance from "utils/api";
import axios, { AxiosError } from "axios";
import { useForm, FormProvider } from "react-hook-form";

//schema
import { defaultLoginUserInputData, loginUserSchema } from "./LoginForm.schema";
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
import { mutate } from "swr";
import { useAlert } from "layout/dashboard/context/alert.context";
import { ILoginUserInputData } from "interfaces/user.interfaces";
import { loginUser, userApiUrl } from "services/user.service";

const Form = () => {
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(loginUserSchema),
    shouldUnregister: false,
    defaultValues: defaultLoginUserInputData,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const onSubmit = async (data: ILoginUserInputData) => {
    try {
      await loginUser(data);
      mutate(userApiUrl);

      reset();
      handleAlert("success", "Zalogowano");
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return handleAlert("error", "Nieprawidłowy adres e-mail lub hasło");
        }
      }

      handleAlert("error", "Wystąpił błąd podczas logowania");
    }
  };

  return (
    <FormProvider {...methods}>
      <AuthFormContainer>
        <StylesAuthFormHeading>
          <h1>{t("login.title")}</h1>
          <p>{t("login.description")}</p>
        </StylesAuthFormHeading>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              t("login.title")
            )}
          </Button>
        </form>
        <StyledAuthFormLinkWrapper>
          <p>{t("register.info")}</p>
          <Link to="/auth/register">
            <a>{t("register.title")}</a>
          </Link>
        </StyledAuthFormLinkWrapper>
      </AuthFormContainer>
    </FormProvider>
  );
};

export default Form;
