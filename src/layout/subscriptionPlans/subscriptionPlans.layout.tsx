import React, { useEffect } from "react";

//components
import Nav from "layout/dashboard/nav/Nav";

//interfaces
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styled from "./subscriptionPlans.layout.styles";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//components
import Alert from "components/alert/Alert";
import PageLoading from "components/loading/PageLoading";
import { useUser } from "services/user.service";
import { Outlet, useNavigate } from "react-router";

const SubscriptionPlansLayout = () => {
  const { alert, handleAlert } = useAlert();
  const { user, userLoading, loggedOut, userError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedOut) {
      navigate("/auth/login");
    }
  }, [loggedOut]);

  if (userLoading) return <PageLoading />;

  return (
    <Styled.MainLayoutContainer>
      <Nav />
      {alert.display && <Alert type={alert.type} message={alert.message} />}
      <Outlet />
    </Styled.MainLayoutContainer>
  );
};

export default SubscriptionPlansLayout;
