import React from "react";

import * as Styled from "./EmailWrapper.styles";
import { IChildrenProps } from "interfaces/children.interfaces";

const EmailWrapper = ({ children }: IChildrenProps) => {
  return <Styled.EmailWrapper>{children}</Styled.EmailWrapper>;
};

export default EmailWrapper;
