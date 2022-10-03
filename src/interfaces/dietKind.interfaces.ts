export interface IDietKindData {
  _id: string;
  user: string;
  name: string;
  type: "healing" | "unconventional" | "other"; //"niekownencjonalna" | "lecznicza" | "inna"
  description?: string;
}
