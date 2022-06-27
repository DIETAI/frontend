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
import { FileLibraryProvider } from "./context/fileLibrary.context";

const DashboardLayout = ({ children }: IChildrenProps) => {
  return (
    <AlertProvider>
      <SidebarViewProvider>
        <FileLibraryProvider>
          <Styled.DashboardWrapper>
            <Sidebar />
            <Content>{children}</Content>
          </Styled.DashboardWrapper>
        </FileLibraryProvider>
      </SidebarViewProvider>
    </AlertProvider>
  );
};

export default DashboardLayout;
