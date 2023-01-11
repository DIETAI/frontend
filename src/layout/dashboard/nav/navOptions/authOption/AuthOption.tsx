import React from "react";
import AvatarImg from "assets/avatar.png";
import axios from "utils/api";
import { useNavigate, redirect } from "react-router";
import NoUserImg from "assets/noUser.svg";
import { Link } from "react-router-dom";

import * as Styled from "./AuthOption.styles";

import { useUser } from "services/useUser";
import { mutate } from "swr";

const AuthOption = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const signOut = async () => {
    const logout = await axios.delete("/api/v1/sessions", {
      withCredentials: true,
    });

    // console.log({ logout });
    mutate("/api/v1/user", null);
    // window.location.reload();
    navigate("/auth/login");
    // return redirect("/auth/login");
  };

  return (
    <Styled.AuthOptionWrapper>
      <Styled.PersonWrapper background={!user?.avatar}>
        <img src={user?.avatar?.imageURL || NoUserImg} />
        <Styled.PersonInfoWrapper>
          <h2>{user?.fullName}</h2>
          <p>{user?.email}</p>
        </Styled.PersonInfoWrapper>
      </Styled.PersonWrapper>
      <Styled.Divider />
      <Styled.ListWrapper>
        <li>
          <Link to={"/dashboard/account"}>profil</Link>
        </li>
        {/* <li>
          <a>Ustawienia</a>
        </li>
        <li>
          <a>Plany</a>
        </li>
        <li>
          <a>Płatności</a>
        </li> */}
      </Styled.ListWrapper>
      <Styled.Divider />
      <Styled.SignoutButton onClick={signOut}>wyloguj się</Styled.SignoutButton>
    </Styled.AuthOptionWrapper>
  );
};

export default AuthOption;
