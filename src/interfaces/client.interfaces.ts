type IDisease =
  | "flatulence"
  | "constipation"
  | "reflux"
  | "obesity"
  | "osteoporosis"
  | "gout"
  | "atherosclerosis"
  | "hypertension"
  | "tumor";

type IAlergen = "peanuts" | "rye" | "eggProtein";

export interface IClientData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  physiologicalState?: "lack" | "pregnancy" | "lactation";
  email?: string;
  onlineAccount?: boolean;
  image?: string;
  phoneNumber?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  notes?: string;
  diseases?: IDisease[];
  alergens?: IAlergen[];
  expectedBodyWeight?: number;
  specificAims?: string[];
  pal: number;
  likedProducts?: string[];
  dislikedProducts?: string[];
}

export interface IClientPaginationData {
  clients: IClientData[];
  pagination: {
    count: number;
    pageCount: number;
  };
}

export interface IClientProps {
  client: IClientData;
}
