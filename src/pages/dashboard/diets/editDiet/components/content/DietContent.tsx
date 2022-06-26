import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

import * as Styled from "./DietContent.styles";

const DietContent = ({ children }: IChildrenProps) => {
  return <Styled.DietContentWrapper>{children}</Styled.DietContentWrapper>;
};

export default DietContent;
