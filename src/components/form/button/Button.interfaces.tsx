import { IChildrenProps } from "interfaces/children.interfaces";
import React from "react";

export interface IButtonProps {
  children: IChildrenProps["children"];
  variant?:
    | "primary"
    | "secondary"
    | "disabled"
    | "data-primary"
    | "data-secondary"
    | "data-delete-primary"
    | "data-delete-secondary";
  onClick?: () =>
    | void
    | ((e: React.FormEvent<HTMLFormElement>) => Promise<void>);
  width?: string;
  type?: "submit" | "button";
  fullWidth?: boolean;
}
