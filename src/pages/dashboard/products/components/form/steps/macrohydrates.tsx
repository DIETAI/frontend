import React, { useEffect } from "react";
import Input from "components/form/input/Input";
import { useFormContext } from "react-hook-form";
import { round2 } from "pages/dashboard/dietEstablishments/helpers/round";

//translation
import { useTranslation } from "react-i18next";

//interfaces
import { IProductMacrohydrates } from "../../../schema/productFormSchema";

const Macrohydrates = () => {
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { t } = useTranslation();

  // obliczanie węglowodanów przyswajalnych i kcal
  const protein = watch("protein") as IProductMacrohydrates["protein"];
  const fat = watch("fat") as IProductMacrohydrates["fat"];
  const carbohydrates = watch(
    "carbohydrates"
  ) as IProductMacrohydrates["carbohydrates"];
  const fiber = watch("fiber") as IProductMacrohydrates["fiber"];

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = !e.currentTarget.value
      ? undefined
      : parseFloat(parseFloat(e.currentTarget.value).toFixed(2));

    console.log({ name: e.currentTarget.name, value: value });

    if (!value) return setValue(e.currentTarget.name, 0);

    setValue(e.currentTarget.name, value);
  };

  useEffect(() => {
    if (protein.gram) {
      const proteinKcal = protein.gram * 4;
      return setValue("protein.kcal", round2(proteinKcal));
    }
    setValue("protein.kcal", 0);
  }, [protein.gram]);

  useEffect(() => {
    if (fat.gram) {
      const fatKcal = fat.gram * 9;
      return setValue("fat.kcal", round2(fatKcal));
    }
    setValue("fat.kcal", 0);
  }, [fat.gram]);

  useEffect(() => {
    if (carbohydrates.gram) {
      const carbohydratesKcal = carbohydrates.gram * 4;
      return setValue("carbohydrates.kcal", round2(carbohydratesKcal));
    }
    setValue("carbohydrates.kcal", 0);
  }, [carbohydrates.gram]);

  //fiber
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
    if (protein.kcal && fat.kcal) {
      const proteinFatKcal = round2(protein.kcal + fat.kcal);
      const proteinFatExchangers = round2(proteinFatKcal / 100);
      setValue("proteinFatExchangers", proteinFatExchangers);
      return;
    }

    setValue("proteinFatExchangers", 0);
  }, [protein.kcal, fat.kcal]);

  useEffect(() => {
    // if (protein.kcal && fat.kcal && carbohydrates.kcal) {
    const kcal = round2(protein.kcal + fat.kcal + carbohydrates.kcal);
    console.log({ kcal });
    setValue("kcal", kcal);
    return;
    // }

    // setValue("kcal", 0);
  }, [protein.kcal, fat.kcal, carbohydrates.kcal]);

  return (
    <>
      <Input
        label={`${t("product.form.macrohydrates.proteinGram")} *`}
        type="number"
        name="protein.gram"
        onChange={handleChange}
        controlled
        fullWidth
      />
      <Input
        label={`${t("product.form.macrohydrates.fatGram")} *`}
        type="number"
        name="fat.gram"
        onChange={handleChange}
        controlled
        fullWidth
      />
      <Input
        label={`${t("product.form.macrohydrates.carbohydratesGram")} *`}
        type="number"
        name="carbohydrates.gram"
        onChange={handleChange}
        controlled
        fullWidth
      />
      <Input
        label={`${t("product.form.macrohydrates.fiberGram")} *`}
        type="number"
        name="fiber.gram"
        onChange={handleChange}
        controlled
        fullWidth
        step="0.01"
      />
      <Input
        label={`${t(
          "product.form.macrohydrates.digestibleCarbohydratesGram"
        )} *`}
        type="number"
        name="digestableCarbohydrates.gram"
        disabled
        fullWidth
      />
      <Input
        fullWidth
        label={t("product.form.macrohydrates.carbohydrateExchangers")}
        type="number"
        name="carbohydrateExchangers"
        disabled
      />
      <Input
        fullWidth
        label={t("product.form.macrohydrates.proteinFatExchangers")}
        type="number"
        name="proteinFatExchangers"
        disabled
      />

      <Input
        label={`${t("product.form.macrohydrates.kcal")} *`}
        type="number"
        name="kcal"
        disabled
        fullWidth
      />
    </>
  );
};

export default Macrohydrates;
