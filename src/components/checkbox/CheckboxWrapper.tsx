import React from "react";
import * as Styled from "./CheckboxWrapper.styles";

//icons
import * as Icon from "icons/icons";

//interfaces
import { ICheckedProps } from "./CheckboxWrapper.interfaces";

const CheckBoxWrapper = ({ checked, onClick }: ICheckedProps) => {
  return (
    <Styled.CheckBox checked={checked} onClick={onClick}>
      <div> {checked && <Icon.FaCheck />}</div>
    </Styled.CheckBox>
  );
};

export default CheckBoxWrapper;
