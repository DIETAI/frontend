export interface IOption {
  id: number;
  image: string;
  title: string;
  slug: string;
}

export interface ISelectProps {
  options: IOption[];
}
