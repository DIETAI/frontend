import React, { useState } from "react";
import { Link } from "react-router-dom";
import { languages } from "utils/languages";

//animations
import { AnimatePresence } from "framer-motion";

//components
import Logo from "assets/logo.svg";

//styles
import * as Styled from "./nav.styles";

//components
import Burger from "../burger/burger";
import Switch from "components/switch/Switch";
import Select from "components/select/Select";

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

//context
// import { useDarkMode } from "context/darkMode.context";

//icons
import * as Icon from "icons/icons";

import { useTranslation, Trans } from "react-i18next";

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <>
      <Styled.NavContainer>
        <Styled.NavWrapper>
          <Link to="/">
            <img src={Logo} className="logo" />
          </Link>
          <Styled.OptionsWrapper>
            <Select options={languages} />
            <Switch />
          </Styled.OptionsWrapper>
          <Styled.Burger onClick={() => setBurgerOpen(true)}>
            <Icon.FaBars />
          </Styled.Burger>
        </Styled.NavWrapper>
      </Styled.NavContainer>
      <AnimatePresence>
        {burgerOpen && (
          <Burger burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
