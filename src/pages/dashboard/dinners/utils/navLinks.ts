interface INavLink {
  id: number;
  title: string;
  path: string;
}

export const dinnerNavLinks = [
  { id: 1, title: "wszystkie posiłki", path: "/dashboard/dinners" },
  { id: 2, title: "nowy posiłek", path: "/dashboard/dinners/new" },
  // { id: 3, title: "grupy posiłków", path: "/dashboard/dinners/groups" },
];
