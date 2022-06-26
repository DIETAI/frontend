import React from "react";
import AvatarImg from "assets/avatar.png";
import axios from "utils/api";
import { useNavigate } from "react-router";

import * as Styled from "./AuthOption.styles";

import { useUser } from "services/useUser";

const AuthOption = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const signOut = async () => {
    const logout = await axios.delete("/api/v1/sessions", {
      withCredentials: true,
    });

    console.log({ logout });
    window.location.reload();
    // navigate("/auth/login");
  };

  return (
    <Styled.AuthOptionWrapper>
      <Styled.PersonWrapper>
        <img src={user?.avatar || AvatarImg} />
        <Styled.PersonInfoWrapper>
          <h2>{user?.fullName}</h2>
          <p>{user?.email}</p>
        </Styled.PersonInfoWrapper>
      </Styled.PersonWrapper>
      <Styled.Divider />
      <Styled.ListWrapper>
        <li>
          <a>Profil</a>
        </li>
        <li>
          <a>Ustawienia</a>
        </li>
        <li>
          <a>Plany</a>
        </li>
        <li>
          <a>Płatności</a>
        </li>
      </Styled.ListWrapper>
      <Styled.Divider />
      <Styled.SignoutButton onClick={signOut}>wyloguj się</Styled.SignoutButton>
    </Styled.AuthOptionWrapper>
  );
};

export default AuthOption;
