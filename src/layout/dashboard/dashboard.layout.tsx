import React, { useState } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

//components
import Sidebar from "./sidebar/Sidebar";
import Content from "./content/Content";

//styles
import * as Styled from "./dashboard.layout.styles";

//context
import { SidebarViewProvider } from "./context/sidebarView.context";
import { AlertProvider } from "./context/alert.context";

const DashboardLayout = ({ children }: IChildrenProps) => {
  return (
    <AlertProvider>
      <SidebarViewProvider>
        <Styled.DashboardWrapper>
          <Sidebar />
          <Content>{children}</Content>
        </Styled.DashboardWrapper>
      </SidebarViewProvider>
    </AlertProvider>
  );
};

export default DashboardLayout;
