import { IDietMealPopulateData } from "interfaces/diet/dietPopulate.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

export interface IDinnerModalProps {
  closeModal: () => void;
  meal: IDietMealPopulateData;
}
