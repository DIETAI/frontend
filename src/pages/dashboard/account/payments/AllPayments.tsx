import React from "react";
import { useTranslation } from "react-i18next";

//components
import PageHeading from "pages/dashboard/components/pageHeading/PageHeading";
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nr faktury", key: "name" },
  { label: "data wystawienia", key: "kcal" },
  { label: "kwota brutto", key: "proteinGram" },
  { label: "pobierz fakturę", key: "fatGram" },
  { label: "korekta faktury", key: "carbohydratesGram" },
];

const AllPayments = () => {
  const { t } = useTranslation();

  const payments = [] as any;
  const loadingPayments = false;

  const deletePayments = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={loadingPayments}
        availableColumns={availableColumns}
        dataRows={payments}
        deleteAction={deletePayments}
        linkPage="new"
      />
    </>
  );
};

export default AllPayments;
