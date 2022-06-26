import React from "react";

import EmailVerifyImg from "assets/email/mail-send.svg";

//components
import Section from "../components/Section";
import RoleVerifyForm from "./components/form/RoleVerifyForm";

//translation
import { useTranslation } from "react-i18next";
import Button from "components/form/button/Button";

const RoleVerify = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <RoleVerifyForm />
    </Section>
  );
};

export default RoleVerify;
