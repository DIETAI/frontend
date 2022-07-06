import { ReactNode } from "react";
import { AnyObjectSchema } from "yup";

export interface ISteps {
  id: number;
  requiredFields: boolean;
  title: string;
  description: string;
  icon: ReactNode;
  validationSchema: AnyObjectSchema;
  stepContent: ReactNode;
  sectionId: string;
}

export interface ISidebarPage {
  id: number;
  title: string;
  component: ReactNode;
}

export interface IMultiStepSidebarProps {
  title: string;
  icon: ReactNode;
  pages: ISidebarPage[];
  // steps: ISteps[];
}
