import React, { useRef } from "react";
import axios from "axios";

//components
import Section from "../components/section/Section";
import RegisterForm from "./components/registerForm/RegisterForm";

import { IRegisterSchema } from "./components/registerForm/RegisterForm.schema";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);

  async function onSubmit(values: IRegisterSchema) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/users`,
        values
      );

      console.log(res);
      // router.push("/");
    } catch (e: any) {
      // setRegisterError(e.message as string);
    }
  }

  const handleSubmit = async () => {
    return;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (emailRef.current && passwordRef.current && displayNameRef.current) {
  //       const email = emailRef.current.value;
  //       const password = passwordRef.current.value;

  //       const userCred = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );

  //       console.log(userCred);

  //       if (!userCred) {
  //         //setError(true)
  //         //setAlert(true)
  //         return;
  //       }

  //       const userModel = {
  //         uid: userCred.user.uid,
  //         providerId: userCred.user.providerId,
  //         displayName: displayNameRef.current.value,
  //         name: displayNameRef.current.value,
  //         lastName: displayNameRef.current.value,
  //         email: userCred.user.email,
  //         photoURL: userCred.user.photoURL || undefined,
  //       };

  //       console.log({ userModel });

  //       //create userInDatabase
  //       try {
  //         const createUserModel = await axios.post(
  //           "http://localhost:1337/api/v1/users",
  //           userModel
  //         );

  //         console.log(createUserModel);
  //       } catch (e) {
  //         //setError(true)
  //         //setAlert(true)
  //         console.log(e);
  //         return await deleteUser(userCred.user);
  //       }

  //       //if create in database error => deleteUserInFirebase
  //       // await updateProfile(userCred.user, {
  //       //   displayName: displayNameRef,
  //       // });

  //       //change user object in database
  //       // await sendEmailVerification(userCred.user);
  //       console.log(userCred.user);

  //       return userCred.user;
  //     }

  //     //   youtube.com/watch?v=DuAv6Yqv9LI
  //     return;
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }
  // };
  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input ref={emailRef} placeholder="email" type="email" />
    //     <input ref={passwordRef} placeholder="password" type="password" />
    //     <input ref={displayNameRef} placeholder="username" type="text" />
    //     <button type="submit">Zarejestruj się</button>
    //   </form>
    // </div>
    <Section>
      {/* {t("description.part2")} */}
      {/* <form onSubmit={handleSubmit}>
        <Input name="email" type="email" label="Email" />
        <input ref={emailRef} placeholder="email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="submit">Zaloguj się</button>
        {JSON.stringify(user)}
      </form> */}
      <RegisterForm />
      {/* {user && (
        <button type="button" onClick={handleLogout}>
          wyloguj się
        </button>
      )} */}
    </Section>
  );
};

export default Register;
