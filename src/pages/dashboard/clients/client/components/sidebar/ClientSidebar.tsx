import React, { useState } from "react";

import * as Styled from "./ClientSidebar.styles";

import { IClientSidebarProps } from "./ClientSidebar.interfaces";

const ClientSidebar = ({ title, icon, sections }: IClientSidebarProps) => {
  const [activeSidebarSection, setSidebarActiveSection] = useState(
    sections[0].id
  );

  const currentPageComponent = sections.find(
    ({ id }) => id === activeSidebarSection
  )?.component;

  return (
    <Styled.ClientSidebarWrapper>
      <Styled.HeadingWrapper>
        <Styled.IconWrapper>{icon}</Styled.IconWrapper>
        <h2>{title}</h2>
      </Styled.HeadingWrapper>

      {sections.length > 1 && (
        <Styled.SidebarNav>
          {sections.map(({ id, title }) => (
            <Styled.SidebarNavItem
              key={id}
              activeItem={activeSidebarSection === id}
              onClick={() => setSidebarActiveSection(id)}
            >
              {title}
            </Styled.SidebarNavItem>
          ))}
        </Styled.SidebarNav>
      )}
      <Styled.Wrapper>{currentPageComponent}</Styled.Wrapper>
    </Styled.ClientSidebarWrapper>
  );
};

export default ClientSidebar;
