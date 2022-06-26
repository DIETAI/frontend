import { ReactNode } from "react";

export interface IIconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  iconReverse?: boolean;
  className?: string;
}
