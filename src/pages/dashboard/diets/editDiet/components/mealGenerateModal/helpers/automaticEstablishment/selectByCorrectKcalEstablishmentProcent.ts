import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from "../selectGroups";
// import { TMealEstablishment } from "../../../components/form/FormInfoPopup";
import { establishmentReport, IReport } from "./report";

export interface IAutomaticEstablishmentGroupInfo extends ISelectGroupInfo {
  report: IReport[];
  group: IGroup | undefined;
}

export interface IGroup extends ICartesianResult {
  correct: boolean;
  proteinEstablishmentProcent: number;
  fatEstablishmentProcent: number;
  carbohydratesEstablishmentProcent: number;
  report: IReport[];
}

export const selectByCorrectKcalEstablishmentProcent = (
  cartesianGroups: ICartesianResult[],
  // mealEstablishment: TMealEstablishment | undefined
  mealEstablishment?: any
) => {
  const automaticKcalCorrectEstablishmentGroup: IAutomaticEstablishmentGroupInfo =
    {
      report: [],
      group: undefined,
      type: "automaticEstablishmentCorrectKcalMacro",
      name: "znaleziono zestaw zawierający odpowiednią ilość kcal, natomiast wartość % określonych makroskładników nie spełnia założeń",
      description:
        "znaleziono zestaw zawierający odpowiednią ilość kcal, natomiast wartość % określonych makroskładników nie spełnia założeń",
    };

  const selectedGroupsByPerfectKcal = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingKcalProcent) <= 5
  );

  if (selectedGroupsByPerfectKcal.length < 1) {
    return automaticKcalCorrectEstablishmentGroup;
  }

  const macroEstablishmentProcent = selectedGroupsByPerfectKcal.map((group) => {
    //obliczanie procenta założeń do total kcal danej grupy, nie całego dania (różnica np. 20 kcal)
    const totalKcal = group.macroTotalCount.total_kcal;
    const totalProteinKcal = group.macroTotalCount.total_protein_gram * 4;
    const totalFatKcal = group.macroTotalCount.total_fat_gram * 9;
    const totalCarbohydratesKcal =
      group.macroTotalCount.total_carbohydrates_gram * 4;
    //procent
    const proteinEstablishmentProcent = Math.round(
      (totalProteinKcal * 100) / totalKcal
    );
    const fatEstablishmentProcent = Math.round(
      (totalFatKcal * 100) / totalKcal
    );
    const carbohydratesEstablishmentProcent = Math.round(
      (totalCarbohydratesKcal * 100) / totalKcal
    );

    const { protein, fat, carbohydrates } = mealEstablishment;

    const proteinCheck =
      proteinEstablishmentProcent >= protein.min_procent &&
      proteinEstablishmentProcent <= protein.max_procent;

    const fatCheck =
      fatEstablishmentProcent >= fat.min_procent &&
      fatEstablishmentProcent <= fat.max_procent;

    const carbohydratesCheck =
      carbohydratesEstablishmentProcent >= carbohydrates.min_procent &&
      carbohydratesEstablishmentProcent <= carbohydrates.max_procent;

    const report = establishmentReport(
      proteinCheck,
      carbohydratesCheck,
      fatCheck
    );

    return {
      ...group,
      proteinEstablishmentProcent,
      fatEstablishmentProcent,
      carbohydratesEstablishmentProcent,
      correct: true,
      report,
    };
  });

  const selectedCorrectAutomaticGroups = macroEstablishmentProcent.filter(
    ({ correct }) => correct === true
  );

  console.log({ automaticKcalMacroEstGroups: selectedCorrectAutomaticGroups });

  if (selectedCorrectAutomaticGroups.length < 1) {
    return {
      ...automaticKcalCorrectEstablishmentGroup,
      report: macroEstablishmentProcent[0].report,
    };
  }

  const selectGroup = () => {
    const group = [...selectedCorrectAutomaticGroups].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingKcalProcent) -
        Math.abs(b.missingProcentCount.missingKcalProcent)
    )[0];

    return group;
  };

  return {
    ...automaticKcalCorrectEstablishmentGroup,
    group: selectGroup(),
    report: selectGroup().report,
  };
};
