interface INavLink {
  id: number;
  title: string;
  path: string;
}

export const dietsNavLinks: INavLink[] = [
  { id: 1, title: "wszystkie jadłospisy", path: "/dashboard/diets" },
  { id: 2, title: "nowy jadłospis", path: "/dashboard/diets/new" },
];
