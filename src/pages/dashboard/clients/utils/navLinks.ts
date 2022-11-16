interface INavLink {
  id: number;
  title: string;
  path: string;
}

export const clientNavLinks = [
  { id: 1, title: "wszyscy pacjenci", path: "/dashboard/clients" },
  { id: 2, title: "nowy pacjent", path: "/dashboard/clients/new" },
  // { id: 2, title: "grupy klientów", path: "/dashboard/clients/groups" },
];
