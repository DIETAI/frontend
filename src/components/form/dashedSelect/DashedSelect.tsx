import React from "react";

//styles
import * as Styles from "./DashedSelect.styles";

//interfaces
import { IDashedSelectProps } from "./DashedSelect.interfaces";

const DashedSelect = ({
  icon,
  text,
  onClick,
  fullWidth,
}: IDashedSelectProps) => {
  return (
    <Styles.DashedSelectWrapper onClick={onClick} fullWidth={fullWidth}>
      <span>{icon}</span> <p>{text}</p>
    </Styles.DashedSelectWrapper>
  );
};

export default DashedSelect;
