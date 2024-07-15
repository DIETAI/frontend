import React, { Suspense, useEffect } from "react";

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
import PageLoading from "components/loading/PageLoading";
import { useUser } from "services/user.service";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const { alert, handleAlert } = useAlert();
  const navigate = useNavigate();

  const { user, userLoading, loggedOut } = useUser();

  useEffect(() => {
    if (user && !loggedOut) {
      navigate("/dashboard/home");
    }
  }, [user, loggedOut]);

  if (!loggedOut) return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <Styled.MainLayoutContainer>
        <Nav />
        {alert.display && <Alert type={alert.type} message={alert.message} />}
        <Outlet />
      </Styled.MainLayoutContainer>
    </Suspense>
  );
};

export default AuthLayout;
