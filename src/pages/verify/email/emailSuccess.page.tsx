import React from "react";

import EmailSuccessImg from "assets/email/mail-verify.svg";

//components
import Section from "../components/Section";
import EmailWrapper from "./components/EmailWrapper";
import Confetti from "react-confetti";

//styles
import { EmailHeading as StylesEmailHeading } from "./components/EmailWrapper.styles";

//translation
import { useTranslation } from "react-i18next";
import Button from "components/form/button/Button";

const EmailSuccess = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <EmailWrapper>
        <img src={EmailSuccessImg} />
        <StylesEmailHeading>
          <h1>{t("verify.email.successTitle")}</h1>
          <p>{t("verify.email.successDescription")}</p>
        </StylesEmailHeading>
        <Button variant="primary">{t("verify.email.successButtonText")}</Button>
      </EmailWrapper>

      <Confetti tweenDuration={200} recycle={false} className="confetti" />
    </Section>
  );
};

export default EmailSuccess;
