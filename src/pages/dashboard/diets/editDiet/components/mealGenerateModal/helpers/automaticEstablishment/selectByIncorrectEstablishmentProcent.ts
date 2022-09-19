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

export const selectByInCorrectKcalEstablishmentProcent = (
  cartesianGroups: ICartesianResult[],
  // mealEstablishment: TMealEstablishment | undefined
  mealEstablishment?: any
) => {
  const automaticKcalInCorrectEstablishmentGroup: IAutomaticEstablishmentGroupInfo =
    {
      report: [],
      group: undefined,
      type: "automaticEstablishmentInCorrectKcalMacro",
      name: "zestaw gdzie kcal i wartość % określonych makroskładników nie spełnia założeń",
      description:
        "zestaw gdzie kcal i wartość % określonych makroskładników nie spełnia założeń",
    };

  const sortGroupByKcal = [...cartesianGroups].sort(
    (a, b) =>
      Math.abs(a.missingProcentCount.missingKcalProcent) -
      Math.abs(b.missingProcentCount.missingKcalProcent)
  )[0];

  const totalKcal = sortGroupByKcal.macroTotalCount.total_kcal;
  const totalProteinKcal =
    sortGroupByKcal.macroTotalCount.total_protein_gram * 4;
  const totalFatKcal = sortGroupByKcal.macroTotalCount.total_fat_gram * 9;
  const totalCarbohydratesKcal =
    sortGroupByKcal.macroTotalCount.total_carbohydrates_gram * 4;
  //procent
  const proteinEstablishmentProcent = Math.round(
    (totalProteinKcal * 100) / totalKcal
  );
  const fatEstablishmentProcent = Math.round((totalFatKcal * 100) / totalKcal);
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

  const selectedGroup = {
    ...sortGroupByKcal,
    proteinEstablishmentProcent,
    fatEstablishmentProcent,
    carbohydratesEstablishmentProcent,
    correct: true,
    report,
  };

  return {
    ...automaticKcalInCorrectEstablishmentGroup,
    group: selectedGroup,
    report: selectedGroup.report,
  };
};
