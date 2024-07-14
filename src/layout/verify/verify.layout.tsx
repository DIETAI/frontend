import React, { useEffect } from "react";

//components
import Nav from "layout/auth/nav/nav";

//interfaces
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styled from "./verify.layout.styles";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//components
import Alert from "components/alert/Alert";
import PageLoading from "components/loading/PageLoading";
import { useUser } from "services/user.service";
import { Outlet } from "react-router";

const VerifyLayout = () => {
  const { alert, handleAlert } = useAlert();
  const { userLoading } = useUser();

  if (userLoading) return <PageLoading />;

  return (
    <Styled.MainLayoutContainer>
      <Nav />
      {alert.display && <Alert type={alert.type} message={alert.message} />}
      <Outlet />
    </Styled.MainLayoutContainer>
  );
};

export default VerifyLayout;
