import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

export interface IDinnerModalProps {
  closeModal: () => void;
  meal: IDietMealQueryData;
}
