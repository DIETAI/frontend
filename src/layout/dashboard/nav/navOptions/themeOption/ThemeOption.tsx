import React from "react";

import * as Styled from "./ThemeOption.styles";
import Switch from "components/switch/Switch";

const ThemeOption = () => {
  return (
    <Styled.ThemeOptionWrapper>
      <li>
        motyw
        <Switch />
      </li>
    </Styled.ThemeOptionWrapper>
  );
};

export default ThemeOption;
