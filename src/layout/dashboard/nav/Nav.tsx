import React from "react";
import NoUserImg from "assets/noUser.svg";
import * as Styled from "./Nav.styles";

//logo
import DietAILogoIcon from "assets/logo-icon.svg";

//context
import { useSidebarView } from "../context/sidebarView.context";

//components
import Switch from "components/switch/Switch";
import IconModal from "components/iconModal/IconModal";
import IconButton from "components/iconButton/IconButton";

//options
import AuthOption from "./navOptions/authOption/AuthOption";
import ThemeOption from "./navOptions/themeOption/ThemeOption";
import NotificationOption from "./navOptions/notificationOption/NotificationOption";

//icons
import { FaSun, FaBars, FaAngleLeft } from "icons/icons";

//img
import { useUser } from "services/user.service";

const Nav = () => {
  const { user } = useUser();
  const { sidebarView, changeSidebarView } = useSidebarView();

  return (
    <Styled.NavWrapper>
      <Styled.MobileNavOptions>
        <IconButton
          icon={<FaBars />}
          onClick={() => changeSidebarView(!sidebarView)}
        />
        <img src={DietAILogoIcon} />
      </Styled.MobileNavOptions>
      <IconButton
        onClick={() => changeSidebarView(!sidebarView)}
        icon={<FaAngleLeft />}
        iconReverse={!sidebarView}
        className="sidebar-button"
      />

      <Styled.NavOptionsWrapper>
        {/* <Select options={languages} /> */}
        <IconModal icon={<FaSun />}>
          <ThemeOption />
        </IconModal>
        <IconModal img={user?.avatar?.imageURL || NoUserImg} background>
          <AuthOption />
        </IconModal>
      </Styled.NavOptionsWrapper>
    </Styled.NavWrapper>
  );
};

export default Nav;
