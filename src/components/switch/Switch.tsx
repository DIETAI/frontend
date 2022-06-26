import React from "react";
import * as Styled from "./Switch.styles";

//hooks
import { useDarkMode } from "context/darkMode.context";

//icons
import * as Icon from "icons/icons";

const Switch = () => {
  const { darkMode, handleDarkMode } = useDarkMode();

  return (
    <Styled.SwitchWrapper onClick={handleDarkMode}>
      <Styled.Switch darkMode={darkMode}>
        {darkMode ? <Icon.FaMoon /> : <Icon.FaSun />}
      </Styled.Switch>
    </Styled.SwitchWrapper>
  );
};

export default Switch;
