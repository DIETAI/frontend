import React, { useState } from "react";

import * as Styled from "./MeasurementSidebar.styles";

import { IMeasurementSidebarProps } from "./MeasurementSidebar.interfaces";

const MeasurementSidebar = ({
  title,
  icon,
  sections,
}: IMeasurementSidebarProps) => {
  const [activeSidebarSection, setSidebarActiveSection] = useState(
    sections[1].id
  );

  const currentPageComponent = sections.find(
    ({ id }) => id === activeSidebarSection
  )?.component;

  return (
    <Styled.MeasurementSidebarWrapper>
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
    </Styled.MeasurementSidebarWrapper>
  );
};

export default MeasurementSidebar;
