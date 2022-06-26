import React from "react";
import LogoImg from "assets/logo-icon.svg";

import * as Styled from "./NotificationOption.styles";

const NotificationOption = () => {
  return (
    <Styled.NotificationOptionWrapper>
      <Styled.Notification>
        <img src={LogoImg} />
        <Styled.NotificationInfoWrapper>
          <h2>Sprawdź nowości DietAI</h2>
          <p>Cześć Jan zobacz co nowego w DietAI...</p>
        </Styled.NotificationInfoWrapper>
      </Styled.Notification>
      <Styled.Divider />
      <Styled.Notification>
        <img src={LogoImg} />
        <Styled.NotificationInfoWrapper>
          <h2>Sprawdź nowości DietAI</h2>
          <p>Cześć Jan zobacz co nowego w DietAI...</p>
        </Styled.NotificationInfoWrapper>
      </Styled.Notification>
      <Styled.Divider />
      <Styled.Notification>
        <img src={LogoImg} />
        <Styled.NotificationInfoWrapper>
          <h2>Sprawdź nowości DietAI</h2>
          <p>Cześć Jan zobacz co nowego w DietAI...</p>
        </Styled.NotificationInfoWrapper>
      </Styled.Notification>
    </Styled.NotificationOptionWrapper>
  );
};

export default NotificationOption;
