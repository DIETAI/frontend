import React from "react";

import EmailVerifyImg from "assets/email/mail-send.svg";

//components
import Section from "../components/Section";
import EmailWrapper from "./components/EmailWrapper";

//styles
import { EmailHeading as StylesEmailHeading } from "./components/EmailWrapper.styles";

//translation
import { useTranslation } from "react-i18next";

import Button from "components/form/button/Button";

const EmailVerify = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <EmailWrapper>
        <img src={EmailVerifyImg} />
        <StylesEmailHeading>
          <h1>{t("verify.email.verifyTitle")}</h1>
          <p>{t("verify.email.verifyDescription")}</p>
        </StylesEmailHeading>
        <Button variant="primary">{t("verify.email.verifyButtonText")}</Button>
      </EmailWrapper>
    </Section>
  );
};

export default EmailVerify;
