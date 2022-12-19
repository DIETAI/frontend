import format from "date-fns/format";
import { pl } from "date-fns/locale";

export const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "eeee / dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};
