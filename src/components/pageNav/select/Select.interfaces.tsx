export interface IOption {
  [key: string]: string | number;
}

export interface ISelectProps {
  options: IOption[];
  handleSelect: (option: IOption) => void;
  optionLabel: string;
  optionRender: string;
  selectedOption: IOption;
}
