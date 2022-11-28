import React, { useEffect } from "react";
import * as Styled from "./Sidebar.styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

//logo
import DietAILogoIcon from "assets/logo-icon.svg";
//context
import { useSidebarView } from "../context/sidebarView.context";

//links
import { sidebarLinks } from "utils/sidebarLinks";

//components
import SidebarLink from "./link/Link";
import IconButton from "components/iconButton/IconButton";

//icons
import { FaBars } from "icons/icons";

const Sidebar = () => {
  const location = useLocation();
  const { sidebarView, changeSidebarView } = useSidebarView();

  //userLinks display
  const currentUserLinks = () => {
    const userLinks = sidebarLinks.filter((link) =>
      link.roles.includes("dietetic")
    );
    return userLinks;
  };

  useEffect(() => {
    const max800 = window.matchMedia("(max-width: 800px)").matches;

    if (max800 && location.pathname.includes("dashboard")) {
      changeSidebarView(false);
    }
  }, [location]);

  return (
    <Styled.SidebarWrapper sidebarView={sidebarView}>
      <Styled.LogoWrapper sidebarView={sidebarView}>
        <img src={DietAILogoIcon} alt="logo" />
        <h2>DietAI</h2>
      </Styled.LogoWrapper>

      <Styled.MobileBarsWrapper>
        <IconButton
          icon={<FaBars />}
          onClick={() => changeSidebarView(!sidebarView)}
        />
      </Styled.MobileBarsWrapper>

      {sidebarLinks.map((link) => (
        <SidebarLink key={link.path} link={link} />
      ))}
    </Styled.SidebarWrapper>
  );
};

export default Sidebar;
