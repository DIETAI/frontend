import React, { useState } from "react";

import * as Styled from "./MultiStepSidebar.styles";

import { IMultiStepSidebarProps } from "./MultiStepSidebar.interfaces";

const MultiStepSidebar = ({ title, icon, pages }: IMultiStepSidebarProps) => {
  const [activeSidebarSection, setSidebarActiveSection] = useState(pages[0].id);

  const currentPageComponent = pages.find(
    ({ id }) => id === activeSidebarSection
  )?.component;

  return (
    <Styled.MultiStepSidebarWrapper>
      <Styled.HeadingWrapper>
        <Styled.IconWrapper>{icon}</Styled.IconWrapper>
        <h2>{title}</h2>
      </Styled.HeadingWrapper>

      {pages.length > 1 && (
        <Styled.SidebarNav>
          {pages.map(({ id, title }) => (
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
    </Styled.MultiStepSidebarWrapper>
  );
};

export default MultiStepSidebar;
