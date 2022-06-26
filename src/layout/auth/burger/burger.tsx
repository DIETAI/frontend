import React from "react";
import { Link } from "react-router-dom";
import { languages } from "utils/languages";
import { useTranslation, Trans } from "react-i18next";

//styles
import * as Styled from "./burger.styles";

//icons
import * as Icon from "icons/icons";

//interfaces
import { IBurgerProps } from "./burger.interfaces";

//animations
import { burgerAnimations } from "./burger.animations";

//components
import Select from "components/select/Select";
import Switch from "components/switch/Switch";

const Burger = ({ setBurgerOpen }: IBurgerProps) => {
  const { t } = useTranslation();
  return (
    <Styled.BurgerOverlay
      variants={burgerAnimations}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Styled.BurgerContent>
        <Styled.Close onClick={() => setBurgerOpen(false)}>
          <Icon.FaTimes />
        </Styled.Close>
        <Styled.BurgerItems>
          <li>
            {t("burger.theme")}
            <Switch />
          </li>
          <li>
            {t("burger.language")}
            <Select options={languages} />
          </li>
          {/* {userLinks()} */}
        </Styled.BurgerItems>
      </Styled.BurgerContent>
    </Styled.BurgerOverlay>
  );
};

export default Burger;
