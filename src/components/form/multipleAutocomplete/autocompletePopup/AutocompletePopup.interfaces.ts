import { AutocompleteOption } from "../MultipleAutocomplete.interfaces";

export interface IAutocompletePopupProps {
  name: string;
  open: boolean;
  close: () => void;
  fullWidth: boolean;
  options: AutocompleteOption[];
  optionLabel: string;
  renderValue: string;
  handleChange: (value: string) => void;
  //   formFields?: Record<"id", string>[] & { [key: string]: string }[];
}
