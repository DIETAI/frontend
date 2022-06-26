import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

import * as Styled from "./Section.styles";

const Section = ({ children }: IChildrenProps) => {
  return <Styled.SectionWrapper>{children}</Styled.SectionWrapper>;
};

export default Section;
