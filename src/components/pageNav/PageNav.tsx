import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import * as Styled from "./PageNav.styles";

//components
import Select from "./select/Select";

export interface IPageNavLink {
  id: number;
  path: string;
  title: string;
}

interface IPagNavProps {
  pageNavLinks: IPageNavLink[];
  headingTitle: string;
}

const PageNav = ({ headingTitle, pageNavLinks }: IPagNavProps) => {
  const location = useLocation();
  if (pageNavLinks.length < 1) return null;

  return (
    <Styled.PageNavContainer>
      <Styled.HeadingWrapper>
        <h2>{headingTitle}</h2>
      </Styled.HeadingWrapper>
      <Select pageNavLinks={pageNavLinks} />

      <Styled.NavItemsWrapper>
        {pageNavLinks.map((navLink) => (
          <Link key={navLink.id} to={navLink.path}>
            <Styled.PageNavItem
              currentPath={location.pathname === navLink.path}
            >
              <a>{navLink.title}</a>
            </Styled.PageNavItem>
          </Link>
        ))}
      </Styled.NavItemsWrapper>
    </Styled.PageNavContainer>
  );
};

export default PageNav;
