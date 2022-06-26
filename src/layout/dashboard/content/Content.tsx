import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styled from "./Content.styles";

//components
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import Alert from "components/alert/Alert";

//context
import { useSidebarView } from "../context/sidebarView.context";
import { useAlert } from "../context/alert.context";

const Content = ({ children }: IChildrenProps) => {
  const { alert, handleAlert } = useAlert();
  const { sidebarView, changeSidebarView } = useSidebarView();

  return (
    <Styled.Container sidebarView={sidebarView}>
      <Nav />
      <Styled.ContentWrapper>
        {children}
        {alert.display && <Alert type={alert.type} message={alert.message} />}
      </Styled.ContentWrapper>
      <Footer />
    </Styled.Container>
  );
};

export default Content;
