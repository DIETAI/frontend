import React, { useRef } from "react";
import axios from "axios";

//components
import Section from "../components/section/Section";
import RegisterForm from "./components/registerForm/RegisterForm";

const Register = () => {
  return (
    <Section>
      <RegisterForm />
    </Section>
  );
};

export default Register;
