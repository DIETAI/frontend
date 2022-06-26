import React, { ReactElement } from "react";

//interfaces
import { IButtonProps } from "./Button.interfaces";

//styles
import * as Styled from "./Button.styles";

const Button = ({
  children,
  variant = "primary",
  onClick,
  fullWidth,
  type = "button",
}: IButtonProps) => {
  return (
    <Styled.ButtonWrapper
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </Styled.ButtonWrapper>
  );
};

export default Button;
