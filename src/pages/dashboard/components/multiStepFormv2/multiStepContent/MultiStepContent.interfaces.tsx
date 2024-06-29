import { AnyObjectSchema, InferType } from "yup";
import { IChildrenProps } from "interfaces/children.interfaces";
import { FieldValues } from "react-hook-form";
import { ReactNode } from "react";

export interface IFormStepProps {
  children: IChildrenProps["children"];
  validationSchema: AnyObjectSchema;
  label: string;
  icon: ReactNode;
  id: string;
  sectionId: string;
}

export interface IMultiStepContentProps {
  children: IChildrenProps["children"];
  itemId?: string;
  itemCreatedAt?: string;
  itemUpdatedAt?: string;
}
