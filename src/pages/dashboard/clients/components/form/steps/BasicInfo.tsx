import React from "react";

//components
import Input from "components/form/input/Input";

const BasicInfo = () => {
  return (
    <>
      <Input type="text" name="name" label="imię" fullWidth />
      <Input type="text" name="lastName" label="nazwisko" fullWidth />
      <Input type="email" name="email" label="email" fullWidth />
      <Input type="text" name="phone" label="numer telefonu" fullWidth />
      <Input type="text" name="dateOfBirth" label="data urodzenia" fullWidth />
      <p>avatar</p>
      <p>online account</p>
      <Input type="text" name="street" label="ulica" fullWidth />
      <Input type="text" name="zipCode" label="kod pocztowy" fullWidth />
      <Input type="text" name="city" label="miasto" fullWidth />
      <Input type="text" name="notes" label="notatki" fullWidth textarea />
    </>
  );
};

export default BasicInfo;
