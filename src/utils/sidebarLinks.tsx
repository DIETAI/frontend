import React from "react";
import { ReactNode } from "react";
import {
  FaUser,
  FaUsers,
  FaCarrot,
  FaUtensils,
  FaCubes,
  FaHome,
  FaWeight,
  FaFileInvoice,
  FaUserPlus,
  FaCalendarDay,
} from "icons/icons";

interface IChildrenLink {
  name: string;
  path: string;
}

export interface ISidebarLink {
  name: string;
  icon: ReactNode;
  roles: string[];
  path: string;
  children?: IChildrenLink[];
}

export const sidebarLinks: ISidebarLink[] = [
  {
    path: "/dashboard/home",
    name: "dashboardSidebar.home",
    icon: <FaHome />,
    roles: ["client", "personal", "dietetic", "admin"],
  },
  {
    path: "/dashboard/account",
    name: "dashboardSidebar.account",
    icon: <FaUser />,
    roles: ["client", "personal", "dietetic", "admin"],
    children: [
      {
        path: "/dashboard/profile",
        name: "Profil",
      },
      {
        path: "/dashboard/payments",
        name: "Płatności",
      },
      {
        path: "/dashboard/settings",
        name: "Ustawienia",
      },
    ],
  },
  // {
  //   path: "/dashboard/clients",
  //   name: "Klienci",
  //   icon: <FaUsers />,
  //   roles: ["dietetic", "admin"],
  // },
  // {
  //   path: "/dashboard/users",
  //   name: "Użytkownicy",
  //   icon: <FaUsers />,
  //   roles: ["admin"],
  // },
  {
    path: "/dashboard/clients",
    name: "dashboardSidebar.clients",
    icon: <FaUsers />,
    roles: ["dietetic", "admin"],
  },
  {
    path: "/dashboard/measurements",
    name: "dashboardSidebar.measurements",
    icon: <FaWeight />,
    roles: ["personal", "dietetic", "admin"],
  },
  {
    path: "/dashboard/diet-establishments",
    name: "dashboardSidebar.establishments",
    icon: <FaFileInvoice />,
    roles: ["personal", "dietetic", "admin"],
  },
  {
    path: "/dashboard/products",
    name: "dashboardSidebar.products",
    icon: <FaCarrot />,
    roles: ["personal", "dietetic", "admin"],
  },
  {
    path: "/dashboard/dinners",
    name: "dashboardSidebar.meals",
    icon: <FaUtensils />,
    roles: ["personal", "dietetic", "admin"],
  },
  {
    path: "/dashboard/diets",
    name: "dashboardSidebar.diets",
    icon: <FaCubes />,
    roles: ["personal", "dietetic", "admin"],
  },
  // {
  //   path: "/dashboard/diet-live",
  //   name: "dashboardSidebar.dietLive",
  //   icon: <FaCalendarDay />,
  //   roles: ["personal", "dietetic", "admin"],
  // },
];
