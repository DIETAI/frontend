import React from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

import * as Styled from "./FormWrapper.styles";

const FormWrapper = ({ children }: IChildrenProps) => {
  return <Styled.FormWrapper>{children}</Styled.FormWrapper>;
};

export default FormWrapper;
