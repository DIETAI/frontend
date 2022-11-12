interface INavLink {
  id: number;
  title: string;
  path: string;
}

export const productNavLinks: INavLink[] = [
  { id: 1, title: "wszystkie produkty", path: "/dashboard/products" },
  { id: 2, title: "nowy produkt", path: "/dashboard/products/new" },
  // { id: 2, title: "twoje produkty", path: "/dashboard/products/my" },
  // { id: 2, title: "grupy produktów", path: "/dashboard/products/groups" },
];
