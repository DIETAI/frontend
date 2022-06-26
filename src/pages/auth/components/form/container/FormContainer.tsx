import React from "react";

import * as Styled from "./FormContainer.styles";
import { IChildrenProps } from "interfaces/children.interfaces";

const FormContainer = ({ children }: IChildrenProps) => {
  return <Styled.FormContainer>{children}</Styled.FormContainer>;
};

export default FormContainer;
