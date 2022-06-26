import React from "react";
import { IIconButtonProps } from "./IconButton.interfaces";

import * as Styled from "./IconButton.styles";

const IconButton = ({
  icon,
  onClick,
  iconReverse,
  className,
}: IIconButtonProps) => {
  return (
    <Styled.IconButtonWrapper
      onClick={onClick}
      iconReverse={iconReverse}
      className={className}
    >
      {icon}
    </Styled.IconButtonWrapper>
  );
};

export default IconButton;
