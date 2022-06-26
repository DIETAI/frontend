import React from "react";
import { useTranslation } from "react-i18next";
import AvatarImg from "assets/avatar.png";

//components
import PageHeading from "pages/dashboard/components/pageHeading/PageHeading";
import PersonDataForm from "./components/PersonDataForm";
import InvoiceDataForm from "./components/InvoiceDataForm";

//styles
import * as Styled from "./Profile.styles";

const Account = () => {
  const { t } = useTranslation();
  return (
    <>
      <Styled.AccountContainer>
        <PersonDataForm />
        <InvoiceDataForm />
      </Styled.AccountContainer>
    </>
  );
};

export default Account;
