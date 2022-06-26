import React from "react";
import { useTranslation } from "react-i18next";

//components
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "data", key: "date" },
  { label: "od", key: "sender" },
  { label: "treść", key: "content" },
];

const AllMessages = () => {
  const { t } = useTranslation();

  const messages = [] as any;
  const loadingMessages = false;

  const deleteMessages = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={loadingMessages}
        availableColumns={availableColumns}
        dataRows={messages}
        deleteAction={deleteMessages}
        linkPage="new"
      />
    </>
  );
};

export default AllMessages;
