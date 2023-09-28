import React, { useEffect } from "react";

//components
import Nav from "./nav/nav";

//interfaces
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styled from "./auth.layout.styles";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//components
import Alert from "components/alert/Alert";

const PublicLayout = ({ children }: IChildrenProps) => {
  const { alert, handleAlert } = useAlert();

  return (
    <Styled.MainLayoutContainer>
      <Nav />
      {alert.display && <Alert type={alert.type} message={alert.message} />}
      {children}
    </Styled.MainLayoutContainer>
  );
};

export default PublicLayout;
