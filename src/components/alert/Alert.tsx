import React from "react";
import * as Styled from "./Alert.styles";
import PropTypes from "prop-types";

//icons
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

//interfaces
import { IAlertType } from "./Alert.interfaces";

const Alert = ({ type }: any) => {
  return (
    <Styled.AlertContainer type={type}>
      {type === "success" ? (
        <>
          <FaCheckCircle color="lightgreen" size={30} />
          <Styled.AlertDescription>
            <h2>Sukces</h2>
            <p>Wiadomość została wysłana</p>
          </Styled.AlertDescription>
        </>
      ) : (
        <>
          <Styled.AlertDescription>
            <h2>Error</h2>
            <p>Nie udało się wysłać wiadomości</p>
          </Styled.AlertDescription>
          <FaExclamationCircle color="red" size={30} />
        </>
      )}
    </Styled.AlertContainer>
  );
};

export default Alert;
