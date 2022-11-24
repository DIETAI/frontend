import React from "react";
import { useTranslation } from "react-i18next";
import { getDiets } from "services/getDiets";
import EstablishmentImg from "assets/establishment.svg";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGrid/DataGrid";
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

const AllDiets = () => {
  const { t } = useTranslation();

  const { diets, dietsError, dietsLoading } = getDiets();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dietsError || !diets) return <div>diets error</div>;

  const dietList = () => {
    const modifyDiets = diets.map((data) => ({
      ...data,
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyDiets;
  };

  const deleteDiets = () => {
    return;
  };

  const dietsData = diets?.map((data) => ({
    _id: data._id,
    name: data.name,
    createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
  }));

  const deleteDiet = () => {
    console.log("delete");
  };

  return (
    <>
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/diets/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={dietsData}
          loadingData={dietsLoading}
          columns={columns}
          viewLink="/dashboard/diets/edit"
          editLink="/dashboard/diets"
          deleteAction={deleteDiet}
          gridViewImage={EstablishmentImg}
          renderKey="_id"
          renderLabel="name"
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

export default AllDiets;
