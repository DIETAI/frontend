import { IChildrenProps } from "interfaces/children.interfaces";
import React from "react";

//styles
import * as Styled from "./ImagesContainer.styles";

interface IImagesContainerProps {
  label: string;
  children: IChildrenProps["children"];
}

const ImagesContainer = ({ label, children }: IImagesContainerProps) => {
  return (
    <Styled.ImagesContainer>
      <p>{label}</p>
      <Styled.ImagesWrapper>{children}</Styled.ImagesWrapper>{" "}
    </Styled.ImagesContainer>
  );
};

export default ImagesContainer;
