import React from "react";
import { languages } from "utils/languages";
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
import {
  FaSun,
  FaEnvelope,
  FaCog,
  FaChevronRight,
  FaBars,
  FaAngleLeft,
} from "icons/icons";

//img
import AvatarImg from "assets/avatar.png";
import Button from "components/form/button/Button";
import Select from "components/select/Select";
import { useUser } from "services/useUser";

const Nav = () => {
  const { user } = useUser();
  const { sidebarView, changeSidebarView } = useSidebarView();

  return (
    <Styled.NavWrapper>
      <Styled.MobileNavOptions>
        <IconButton
          icon={<FaBars />}
          onClick={changeSidebarView as () => void}
        />
        <img src={DietAILogoIcon} />
      </Styled.MobileNavOptions>
      <IconButton
        onClick={changeSidebarView as () => void}
        icon={<FaAngleLeft />}
        iconReverse={!sidebarView}
        className="sidebar-button"
      />

      {/* <IconModal icon={<FaChevronRight />} /> */}

      <Styled.NavOptionsWrapper>
        {/* <Select options={languages} /> */}
        <IconModal icon={<FaSun />}>
          <ThemeOption />
        </IconModal>
        {/* <IconModal icon={<FaEnvelope />}>
          <NotificationOption />
        </IconModal> */}
        {/* <IconModal icon={<FaCog />} /> */}
        <IconModal img={user?.avatar || NoUserImg} background>
          <AuthOption />
        </IconModal>
      </Styled.NavOptionsWrapper>

      {/* <Switch /> */}
    </Styled.NavWrapper>
  );
};

export default Nav;
