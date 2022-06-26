export type AutocompleteOption = {
  [key: string]: string | number;
};

export interface IAutocompleteProps {
  name: string;
  label: string;
  fullWidth?: boolean;
  options: AutocompleteOption[];
  optionRender?: string;
  optionLabel: string;
}
