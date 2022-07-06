import { IChildrenProps } from "interfaces/children.interfaces";
import { AnyObjectSchema, TypeOf } from "yup";

export interface IMultiStepContainerProps {
  children: IChildrenProps["children"];
  defaultValues: TypeOf<AnyObjectSchema>;
  onSubmitAction: (data: any) => void;
  validationSchema: AnyObjectSchema;
}
