import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { ILinkProps } from "./Link.interfaces";

import * as Styled from "./Link.styles";
//context
import { useSidebarView } from "layout/dashboard/context/sidebarView.context";

const SidebarLink = ({ link }: ILinkProps) => {
  const { t } = useTranslation();
  const { sidebarView } = useSidebarView();
  const location = useLocation();
  const navigate = useNavigate();
  const activeLink = location.pathname.includes(link.path);

  return (
    <Styled.LinkWrapper
      sidebarView={sidebarView}
      activeLink={activeLink}
      onClick={() => navigate(link.path)}
    >
      <span>{link.icon}</span>
      <a>{t(link.name)}</a>
    </Styled.LinkWrapper>
  );
};

export default SidebarLink;
