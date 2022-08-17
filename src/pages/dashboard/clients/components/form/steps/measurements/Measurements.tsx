import React from "react";
import { useTranslation } from "react-i18next";

//form
import { useFormContext } from "react-hook-form";

//components
import Input from "components/form/input/Input";
import Calendar from "components/form/calendar/Calendar";

const Measurements = () => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    setValue(e.currentTarget.name, value);
  };

  return (
    <>
      <Input
        label={`${t("measurement.form.informations.name")} *`}
        type="text"
        name="name"
        fullWidth
      />
      <Calendar
        label={`${t("measurement.form.informations.date")} *`}
        name="date"
        fullWidth
      />
      <Input
        label={`${t("measurement.form.basicData.weight")} *`}
        type="number"
        name="weight"
        onChange={handleChange}
        controlled
        fullWidth
      />
      <Input
        label={`${t("measurement.form.basicData.height")} *`}
        type="number"
        name="height"
        onChange={handleChange}
        controlled
        fullWidth
      />

      <button>dodatkowe dane pomiaru (bioimpedancja, talia, whr itd..)</button>
      <p>po zapisaniu klienta - zapisanie pierwszego pomiaru</p>
      <p>jeśli nie dodano masy ciała (niedostępne następne steps)</p>
      <p>ustawienie jako główny pomiar</p>
      <p>
        można zmienić datę, lecz daty innych pomiarów dla tego klienta muszą być
        późniejsze
      </p>
    </>
  );
};

export default Measurements;
