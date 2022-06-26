import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./Macrohydrates.styles";

//form
import { useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";

//interfaces
import { IEstablishmentsMacrohydrates } from "../../../../schema/dietEstablishment.schema";

//helpers
import { round2 } from "pages/dashboard/dietEstablishments/helpers/round";

const mainMacrohydrates = [
  {
    id: 1,
    short: "B",
    label: "dietEstablishment.form.macrohydrates.protein",
    gram: {
      label: "dietEstablishment.form.macrohydrates.gram",
      name: "protein.gram",
      disabled: true,
    },
    kcal: {
      label: "dietEstablishment.form.macrohydrates.kcal",
      name: "protein.kcal",
      disabled: true,
    },
    procent: {
      label: "dietEstablishment.form.macrohydrates.procent",
      name: "protein.procent",
      disabled: false,
    },
  },
  {
    id: 2,
    short: "T",
    label: "dietEstablishment.form.macrohydrates.fat",
    gram: {
      label: "dietEstablishment.form.macrohydrates.gram",
      name: "fat.gram",
      disabled: true,
    },
    kcal: {
      label: "dietEstablishment.form.macrohydrates.kcal",
      name: "fat.kcal",
      disabled: true,
    },
    procent: {
      label: "dietEstablishment.form.macrohydrates.procent",
      name: "fat.procent",
      disabled: false,
    },
  },
  {
    id: 3,
    short: "W",
    label: "dietEstablishment.form.macrohydrates.carbohydrates",
    gram: {
      label: "dietEstablishment.form.macrohydrates.gram",
      name: "carbohydrates.gram",
      disabled: true,
    },
    kcal: {
      label: "dietEstablishment.form.macrohydrates.kcal",
      name: "carbohydrates.kcal",
      disabled: true,
    },
    procent: {
      label: "dietEstablishment.form.macrohydrates.procent",
      name: "carbohydrates.procent",
      disabled: false,
    },
  },
  {
    id: 4,
    short: "Bł",
    label: "dietEstablishment.form.macrohydrates.fiber",
    gram: {
      label: "dietEstablishment.form.macrohydrates.gram",
      name: "fiber.gram",
      disabled: false,
    },
    kcal: {
      label: "dietEstablishment.form.macrohydrates.kcal",
      name: "fiber.kcal",
      disabled: true,
    },
  },
  {
    id: 5,
    short: "Wp",
    label: "dietEstablishment.form.macrohydrates.digestableCarbohydrates",
    gram: {
      label: "dietEstablishment.form.macrohydrates.gram",
      name: "digestableCarbohydrates.gram",
      disabled: true,
    },
    kcal: {
      label: "dietEstablishment.form.macrohydrates.kcal",
      name: "digestableCarbohydrates.kcal",
      disabled: true,
    },
  },
  // {
  //   id: 6,
  //   short: "B(zw)",
  //   label: "dietEstablishment.form.macrohydrates.animalProtein",
  //   gram: {
  //     label: "dietEstablishment.form.macrohydrates.gram",
  //     name: "animalProtein.gram",
  //   },
  //   kcal: {
  //     label: "dietEstablishment.form.macrohydrates.kcal",
  //     name: "animalProtein.kcal",
  //   },
  //   procent: {
  //     label: "dietEstablishment.form.macrohydrates.procent",
  //     name: "animalProtein.procent",
  //   },
  // },
  // {
  //   id: 7,
  //   short: "B(r)",
  //   label: "dietEstablishment.form.macrohydrates.vegetableProtein",
  //   gram: {
  //     label: "dietEstablishment.form.macrohydrates.gram",
  //     name: "vegetableProtein.gram",
  //   },
  //   kcal: {
  //     label: "dietEstablishment.form.macrohydrates.kcal",
  //     name: "vegetableProtein.kcal",
  //   },
  //   procent: {
  //     label: "dietEstablishment.form.macrohydrates.procent",
  //     name: "vegetableProtein.procent",
  //   },
  // },
];

const Macrohydrates = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const kcal = watch("kcal") as number;
  const protein = watch("protein") as IEstablishmentsMacrohydrates["protein"];
  const fat = watch("fat") as IEstablishmentsMacrohydrates["fat"];
  const carbohydrates = watch(
    "carbohydrates"
  ) as IEstablishmentsMacrohydrates["carbohydrates"];
  const fiber = watch("fiber") as IEstablishmentsMacrohydrates["fiber"];

  const totalMacrohydratesProcent = watch("maxMacroProcent") as number;

  useEffect(() => {
    if (protein.procent && fat.procent && carbohydrates.procent) {
      const macrohydratesProcentSum =
        protein.procent + fat.procent + carbohydrates.procent;

      return setValue("maxMacroProcent", round2(macrohydratesProcentSum));
    }

    return setValue("maxMacroProcent", 0);
  }, [protein.procent, fat.procent, carbohydrates.procent]);

  useEffect(() => {
    if (protein.procent && kcal) {
      const proteinKcal = (protein.procent * kcal) / 100;
      const proteinGram = proteinKcal / 4;

      setValue("protein.kcal", round2(proteinKcal));
      return setValue("protein.gram", round2(proteinGram));
    }

    setValue("protein.kcal", 0);
    setValue("protein.gram", 0);
  }, [protein.procent, kcal]);

  useEffect(() => {
    if (fat.procent && kcal) {
      const fatKcal = (fat.procent * kcal) / 100;
      const fatGram = fatKcal / 9;

      setValue("fat.kcal", round2(fatKcal));
      return setValue("fat.gram", round2(fatGram));
    }

    setValue("fat.kcal", 0);
    setValue("fat.gram", 0);
  }, [fat.procent, kcal]);

  useEffect(() => {
    if (carbohydrates.procent && kcal) {
      const carbohydratesKcal = (carbohydrates.procent * kcal) / 100;
      const carbohydratesGram = carbohydratesKcal / 4;

      setValue("carbohydrates.kcal", round2(carbohydratesKcal));
      return setValue("carbohydrates.gram", round2(carbohydratesGram));
    }

    setValue("carbohydrates.kcal", 0);
    setValue("carbohydrates.gram", 0);
  }, [carbohydrates.procent, kcal]);

  useEffect(() => {
    if (carbohydrates.gram && fiber.gram) {
      const fiberKcal = round2(fiber.gram * 2);
      const digestibleCarbohydratesGram = round2(
        carbohydrates.gram - fiber.gram
      );
      const digestibleCarbohydratesKcal = round2(
        digestibleCarbohydratesGram * 4
      );

      const ww = digestibleCarbohydratesGram / 10;

      setValue("fiber.kcal", fiberKcal);
      setValue("carbohydrateExchangers", Math.round(ww * 100) / 100);
      setValue("digestableCarbohydrates.gram", digestibleCarbohydratesGram);
      return setValue(
        "digestableCarbohydrates.kcal",
        digestibleCarbohydratesKcal
      );
    }

    setValue("fiber.kcal", 0);
    setValue("carbohydrateExchangers", 0);
    setValue("digestableCarbohydrates.gram", 0);
    setValue("digestableCarbohydrates.kcal", 0);
  }, [carbohydrates.gram, fiber.gram]);

  useEffect(() => {
    if (kcal && carbohydrates.kcal) {
      const proteinFatKcal = round2(kcal - carbohydrates.kcal);
      const proteinFatExchangers = round2(proteinFatKcal / 100);
      setValue("proteinFatExchangers", proteinFatExchangers);
      return;
    }

    setValue("proteinFatExchangers", 0);
  }, [kcal, carbohydrates.kcal]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // const value = !e.currentTarget.value
    //   ? e.currentTarget.value
    //   : parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    const value = parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    setValue(e.currentTarget.name, value);
  };

  // useEffect(() => {
  //   const newMacrohydrates = macrohydrates.map(({ type, name, procent }) => ({
  //     type,
  //     name,
  //     procent: procent,
  //     kcal: roundMacro(countKcal(procent, dietKcal)),
  //     gram: roundMacro(countGram(countKcal(procent, dietKcal), type)),
  //   }));

  //   changeMaxProcent(newMacrohydrates);
  //   return setValue("macrohydrates", newMacrohydrates);
  // }, [dietKcal]);

  // const changeMaxProcent = (macrohydrates: IMacrohydrates[]) => {
  //   setValue("maxMacroProcent", countProcent(macrohydrates));
  // };

  // const changeMacroKcal = (
  //   e: React.FormEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const macrohydrateType = macrohydrates[index].type;

  //   const newProcent = roundMacro(parseInt(e.currentTarget.value));
  //   const newKcal = roundMacro(countKcal(newProcent, dietKcal));
  //   const newGram = roundMacro(
  //     countGram(newKcal, macrohydrateType as MacroType)
  //   );

  //   setValue(`macrohydrates.${index}.procent`, newProcent);
  //   setValue(`macrohydrates.${index}.kcal`, newKcal);
  //   setValue(`macrohydrates.${index}.gram`, newGram);

  //   changeMaxProcent(macrohydrates);
  // };

  return (
    <>
      <Styled.TotalProcentWrapper procent={totalMacrohydratesProcent}>
        <p>wartość % makroskładników</p>
        <h3>{totalMacrohydratesProcent} %</h3>
      </Styled.TotalProcentWrapper>

      {mainMacrohydrates.length > 1 &&
        mainMacrohydrates.map((macrohydrate) => (
          <Styled.FieldWrapper key={macrohydrate.id}>
            <Styled.FieldHeadWrapper>
              <Styled.FieldNumberWrapper>
                <p>{macrohydrate.short}</p>
              </Styled.FieldNumberWrapper>
            </Styled.FieldHeadWrapper>
            {macrohydrate.procent && (
              <Input
                label={`${t(macrohydrate.procent.label)} *`}
                type="number"
                name={macrohydrate.procent.name}
                onChange={handleChange}
                controlled
                fullWidth
              />
            )}

            <Input
              label={`${t(macrohydrate.gram.label)} *`}
              type="number"
              name={macrohydrate.gram.name}
              disabled={macrohydrate.gram.disabled}
              fullWidth
            />
            <Input
              label={`${t(macrohydrate.kcal.label)} *`}
              type="number"
              name={macrohydrate.kcal.name}
              disabled={macrohydrate.kcal.disabled}
              fullWidth
            />
          </Styled.FieldWrapper>
        ))}

      <Input
        fullWidth
        label={t("dietEstablishment.form.macrohydrates.carbohydrateExchangers")}
        type="number"
        name="carbohydrateExchangers"
        disabled
      />
      <Input
        fullWidth
        label={t("dietEstablishment.form.macrohydrates.proteinFatExchangers")}
        type="number"
        name="proteinFatExchangers"
        disabled
      />
    </>
  );
};

export default Macrohydrates;
