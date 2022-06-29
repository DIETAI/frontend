import { ReactNode } from "react";

export interface ISidebarSection {
  id: number;
  title: string;
  component: ReactNode;
}

export interface IDietEstablishmentSidebarProps {
  title: string;
  icon: ReactNode;
  sections: ISidebarSection[];
}
