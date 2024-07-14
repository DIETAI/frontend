import React, { Suspense, useEffect, useState } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";
import { Outlet, useNavigate } from "react-router";

//components
import Sidebar from "./sidebar/Sidebar";
import Content from "./content/Content";

//styles
import * as Styled from "./dashboard.layout.styles";

//context
import { SidebarViewProvider } from "./context/sidebarView.context";
import { FileLibraryProvider } from "./context/fileLibrary.context";
import { useUser } from "services/user.service";
import PageLoading from "components/loading/PageLoading";

const DashboardLayout = () => {
  const { userLoading, loggedOut } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedOut) {
      navigate("/auth/login");
    }
  }, [loggedOut]);

  if (userLoading) return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <SidebarViewProvider>
        <FileLibraryProvider>
          <Styled.DashboardWrapper>
            <Sidebar />
            <Content>
              <Outlet />
            </Content>
          </Styled.DashboardWrapper>
        </FileLibraryProvider>
      </SidebarViewProvider>
    </Suspense>
  );
};

export default DashboardLayout;
