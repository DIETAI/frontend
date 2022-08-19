import React, { useState, useEffect } from "react";

//date-fns
import format from "date-fns/format";

import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

//services
import { getClients } from "services/getClients";

const columns: IColumn[] = [
  { label: "zdjęcie", key: "image", type: "image" },
  { label: "imię", key: "name", type: "text" },
  { label: "nazwisko", key: "lastName", type: "text" },
  // { label: "email", key: "email", type: "text" },
  { label: "data urodzenia", key: "dateOfBirth", type: "text" },
  // { label: "płeć", key: "gender", type: "text" },
];

const AllClients = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  const [pageCount, setPageCount] = useState(0);
  const { clients, clientsError, clientsLoading, pagination } = getClients(
    page.toString(),
    itemsPerPage
  );

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  const handleBack = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === pageCount) return;
    setPage(page + 1);
  };

  console.log({ clients });

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (clientsError || !clients) return <div>clients error</div>;

  const clientsData = clients?.map((data) => ({
    _id: data._id,
    image: data.image,
    name: data.name,
    lastName: data.lastName,
    // email: data.email,
    dateOfBirth: format(new Date(data.dateOfBirth), "dd.MM.yyyy"),
    // gender: data.gender,
  }));

  const deleteClients = () => {
    return;
  };
  const deleteClient = () => {
    console.log("delete client");
  };

  return (
    <>
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/clients/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={clientsData}
          loadingData={clientsLoading}
          columns={columns}
          viewLink="/dashboard/clients"
          editLink="/dashboard/clients/edit"
          deleteAction={deleteClient}
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

export default AllClients;
