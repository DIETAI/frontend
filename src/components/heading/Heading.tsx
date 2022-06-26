import React from "react";

import * as Styled from "./Heading.styles";
import { IHeadingProps } from "./Heading.interfaces";

const Heading = ({ icon, title, description }: IHeadingProps) => {
  return (
    <Styled.Container>
      <Styled.IconWrapper>{icon}</Styled.IconWrapper>
      <Styled.HeadingWrapper>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </Styled.HeadingWrapper>
    </Styled.Container>
  );
};

export default Heading;
