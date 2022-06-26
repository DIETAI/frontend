import React from "react";

//styles
import * as Styles from "./ImageSelect.styles";

//interfaces
import { IImageSelectProps } from "./ImageSelect.interfaces";

const ImageSelect = ({ icon, text, onClick, fullWidth }: IImageSelectProps) => {
  return (
    <Styles.ImageSelectWrapper onClick={onClick} fullWidth={fullWidth}>
      <span>{icon}</span> <p>{text}</p>
    </Styles.ImageSelectWrapper>
  );
};

export default ImageSelect;
