import { ReactNode } from "react";

export interface ISidebarSection {
  id: number;
  title: string;
  component: ReactNode;
}

export interface IClientSidebarProps {
  title: string;
  icon: ReactNode;
  sections: ISidebarSection[];
}
