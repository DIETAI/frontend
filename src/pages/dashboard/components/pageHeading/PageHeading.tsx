import React from "react";

import * as Styled from "./PageHeading.styles";
import { IHeadingProps } from "./PageHeading.interfaces";

const PageHeading = ({ title }: IHeadingProps) => {
  return (
    <Styled.Container>
      <Styled.HeadingWrapper>
        <h2>{title}</h2>
      </Styled.HeadingWrapper>
    </Styled.Container>
  );
};

export default PageHeading;
