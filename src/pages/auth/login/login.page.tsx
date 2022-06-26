import React, { useRef } from "react";
import axios from "axios";
import { useUser } from "services/useUser";

//firebase auth
import {
  signInWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { useTranslation, Trans } from "react-i18next";

import { auth, useAuth } from "utils/firebase";

//components
import Input from "components/form/input/Input";
import LoginForm from "./components/loginForm/LoginForm";
import Section from "../components/section/Section";

//interfaces
import { ILoginSchema } from "./components/loginForm/LoginForm.schema";

interface ICurrentUser extends User {
  accessToken: string;
}

const Login = () => {
  const { user, userLoading, userError } = useUser();

  console.log(user);

  async function onSubmit(values: ILoginSchema) {
    try {
      const session = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/sessions`,
        values,
        { withCredentials: true }
      );

      console.log(session);

      // router.push("/");
    } catch (e: any) {
      console.log(e);
      // setLoginError(e.message as string);
    }
  }

  // const { user } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (emailRef.current && passwordRef.current) {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(userCred.user);
        const identityUser = userCred.user as ICurrentUser;
        localStorage.setItem("accessToken", identityUser.accessToken);
        return userCred.user;
      }

      //   youtube.com/watch?v=DuAv6Yqv9LI
      return;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch {
      alert("Error!");
    }
  }

  return (
    <Section>
      {/* {t("description.part2")} */}
      {/* <form onSubmit={handleSubmit}>
        <Input name="email" type="email" label="Email" />
        <input ref={emailRef} placeholder="email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="submit">Zaloguj się</button>
        {JSON.stringify(user)}
      </form> */}
      <LoginForm />
      {/* {user && (
        <button type="button" onClick={handleLogout}>
          wyloguj się
        </button>
      )} */}
    </Section>
  );
};

export default Login;
