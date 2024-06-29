import { IChildrenProps } from "interfaces/children.interfaces";
import { AnyObjectSchema, InferType } from "yup";

export interface IMultiStepContainerProps {
  children: IChildrenProps["children"];
  defaultValues: InferType<AnyObjectSchema>;
  onSubmitAction: (data: any) => void;
  validationSchema: AnyObjectSchema;
}
