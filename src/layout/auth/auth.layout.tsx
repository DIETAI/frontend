import React, { useEffect } from "react";

//components
import Nav from "./nav/nav";

//interfaces
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styled from "./auth.layout.styles";

const PublicLayout = ({ children }: IChildrenProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default PublicLayout;
