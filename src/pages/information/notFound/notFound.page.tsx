import React from "react";
import { useLocation, useNavigate } from "react-router";

//components
import NotFoundImage from "assets/pageNotFound.svg";
import Button from "components/form/button/Button";

//styles
import * as Styled from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = () => {
    if (location.pathname.includes("dashboard")) {
      navigate("/dashboard/home");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <Styled.ErrorWrapper>
      <img src={NotFoundImage} alt="404 image" />
      <h1>Strona nie istnieje</h1>
      <Button variant="primary" onClick={redirect}>
        {location.pathname.includes("dashboard")
          ? "Przejdź do strony głównej"
          : "Przejdź do strony logowania"}
      </Button>
    </Styled.ErrorWrapper>
  );
};

export default NotFoundPage;
