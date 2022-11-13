import React, { useState, useEffect } from "react";
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
  { label: "zdjęcie", key: "imageURL", type: "image" },
  { label: "nazwa", key: "name", type: "text" },
  { label: "data", key: "createdAt", type: "text" },
];

const AllDinners = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  const [pageCount, setPageCount] = useState(0);

  const { dinners, dinnersError, dinnersLoading, pagination } = getDinners(
    page.toString(),
    itemsPerPage
  );

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dinnersError || !dinners) return <div>dinners error</div>;

  const dinnersData = dinners?.map((data) => ({
    _id: data._id,
    imageURL: data.imageObj?.imageURL,
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
        <DataGridPagination
          currentPage={page}
          pageCount={pageCount}
          changePage={setPage}
          itemsPerPage={itemsPerPage}
          changeItemsPerPage={setItemsPerPage}
        />
      </DataGridContainer>
    </>
  );
};

export default AllDinners;
