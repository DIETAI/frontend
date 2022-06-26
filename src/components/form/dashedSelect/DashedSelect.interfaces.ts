import { ReactNode } from "react";

export interface IDashedSelectProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  fullWidth?: boolean;
}
