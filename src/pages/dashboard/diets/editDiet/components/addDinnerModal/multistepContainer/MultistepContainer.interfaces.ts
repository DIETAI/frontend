import * as yup from "yup";
import { IChildrenProps } from "interfaces/children.interfaces";
import { ReactNode } from "react";

export interface IFormStepProps {
  children: IChildrenProps["children"];
  validationSchema: yup.AnyObjectSchema;
  label: string;
  icon: ReactNode;
}

export interface IDefaultValues {
  defaultValues: yup.TypeOf<yup.AnyObjectSchema>;
}
