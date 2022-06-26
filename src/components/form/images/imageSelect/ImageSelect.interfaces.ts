import { ReactNode } from "react";

export interface IImageSelectProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  fullWidth?: boolean;
}
