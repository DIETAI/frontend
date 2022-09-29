export interface IInputProps {
  name: string;
  label: string;
  placeholder?: string;
  width?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  controlled?: boolean;
  fullWidth?: boolean;
  textarea?: boolean;
  step?: string;
  customValue?: string;
}
