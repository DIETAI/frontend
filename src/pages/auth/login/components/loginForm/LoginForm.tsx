import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "utils/api";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//schema
import { login_schema } from "./LoginForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { ILoginSchema } from "./LoginForm.schema";

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

const defaultValues = login_schema.cast({});

const Form = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(login_schema),
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
  } = methods;

  const onSubmit = async (data: ILoginSchema) => {
    try {
      const loginData = await axios.post("/api/v1/sessions", data, {
        withCredentials: true,
      });
      console.log({ loginData });
      mutate("/api/v1/user");
      // navigate("/dashboard/home");
      reset();
    } catch (e) {
      console.log(e);
      //set error alert
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
