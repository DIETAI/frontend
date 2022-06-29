import React, { useState } from "react";

import * as Styled from "./DietEstablishmentSidebar.styles";

import { IDietEstablishmentSidebarProps } from "./DietEstablishmentSidebar.interfaces";

const DietEstablishmentSidebar = ({
  title,
  icon,
  sections,
}: IDietEstablishmentSidebarProps) => {
  const [activeSidebarSection, setSidebarActiveSection] = useState(
    sections[0].id
  );

  const currentPageComponent = sections.find(
    ({ id }) => id === activeSidebarSection
  )?.component;

  return (
    <Styled.DietEstablishmentSidebarWrapper>
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
    </Styled.DietEstablishmentSidebarWrapper>
  );
};

export default DietEstablishmentSidebar;
