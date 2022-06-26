import React from "react";

import * as Styled from "./Section.styles";
import { IChildrenProps } from "interfaces/children.interfaces";
import BackgroundLogo from "assets/logo-background.svg";

const Section = ({ children }: IChildrenProps) => {
  return (
    <Styled.Section>
      <img className="backgroundImg" src={BackgroundLogo} />
      {children}
    </Styled.Section>
  );
};

export default Section;
