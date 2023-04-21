import React, { useState, useEffect } from "react";
import { clientNavLinks } from "../utils/navLinks";
import NoUserImg from "assets/noUser.svg";

//date-fns
import format from "date-fns/format";

import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";
import PageNav from "components/pageNav/PageNav";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

//services
import { getClients } from "services/getClients";

const columns: IColumn[] = [
  { label: "zdjęcie", key: "imageURL", type: "image" },
  { label: "imię", key: "name", type: "text" },
  { label: "nazwisko", key: "lastName", type: "text" },
  { label: "data urodzenia", key: "dateOfBirth", type: "text" },
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

  const clientsData = clients?.map((data) => ({
    _id: data._id,
    imageURL: data.image?.imageURL,
    name: data.name,
    lastName: data.lastName,
    dateOfBirth: format(new Date(data.dateOfBirth), "dd.MM.yyyy"),
  }));

  const deleteClient = () => {
    console.log("delete client");
  };

  return (
    <>
      <PageNav headingTitle={"Pacjenci"} pageNavLinks={clientNavLinks} />
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/clients/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={clientsData}
          loadingData={clientsLoading}
          errorData={clientsError}
          columns={columns}
          viewLink="/dashboard/clients"
          editLink="/dashboard/clients/edit"
          deleteAction={deleteClient}
          gridViewImage={NoUserImg}
          renderKey="_id"
          renderLabel="fullName"
          renderImage="image"
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
