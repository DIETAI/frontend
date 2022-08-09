import React from "react";
import { useTranslation } from "react-i18next";
import { getDinners } from "services/getDinners";

//date-fns
import format from "date-fns/format";

//components
import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";

import { IColumn } from "pages/dashboard/components/dataGridv3/container/DataGridContainer.interfaces";

const columns: IColumn[] = [
  { label: "nazwa", key: "name", type: "text" },
  { label: "data", key: "createdAt", type: "text" },
];

const AllDinners = () => {
  const { t } = useTranslation();
  const { dinners, dinnersError, dinnersLoading } = getDinners();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dinnersError || !dinners) return <div>dinners error</div>;

  const dinnersList = () => {
    const modifyDinners = dinners.map((data) => ({
      ...data,
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyDinners;
  };

  const deleteDinners = () => {
    return;
  };

  const dinnersData = dinners?.map((data) => ({
    _id: data._id,
    name: data.name,
    createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
  }));

  const deleteDinner = () => {
    console.log("delete");
  };

  return (
    <>
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/dinners/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={dinnersData}
          loadingData={dinnersLoading}
          columns={columns}
          viewLink="/dashboard/dinners"
          editLink="/dashboard/dinners"
          deleteAction={deleteDinner}
        />
        {/* <DataGridPagination
          currentPage={page}
          pageCount={pageCount}
          changePage={setPage}
          itemsPerPage={itemsPerPage}
          changeItemsPerPage={setItemsPerPage}
        /> */}
      </DataGridContainer>
    </>
  );
};

export default AllDinners;
