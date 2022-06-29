import React, { useState } from "react";

import * as Styled from "./ProductSidebar.styles";

import { IProductSidebarProps } from "./ProductSidebar.interfaces";

const ProductSidebar = ({ title, icon, sections }: IProductSidebarProps) => {
  const [activeSidebarSection, setSidebarActiveSection] = useState(
    sections[0].id
  );

  const currentPageComponent = sections.find(
    ({ id }) => id === activeSidebarSection
  )?.component;

  return (
    <Styled.ProductSidebarWrapper>
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
    </Styled.ProductSidebarWrapper>
  );
};

export default ProductSidebar;
