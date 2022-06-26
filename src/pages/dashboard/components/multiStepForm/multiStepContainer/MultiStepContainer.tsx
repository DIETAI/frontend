import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

import * as Styled from "./MultiStepContainer.styles";

const MultiStepContainer = ({ children }: IChildrenProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default MultiStepContainer;
