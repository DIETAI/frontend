import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDietEstablishments } from "services/useDietEstablishments";
import { Link } from "react-router-dom";
import { dietEstablishmentsNavLinks } from "../utils/dietEstablishmentLinks";
import EstablishmentImg from "assets/establishment.svg";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGridv2/DataGrid";

//components
import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";
import PageNav from "components/pageNav/PageNav";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

const columns: IColumn[] = [
  { label: "nazwa", key: "name", type: "text" },
  { label: "data", key: "createdAt", type: "text" },
  { label: "pacjent", key: "client", type: "text" },
  { label: "kcal", key: "kcal", type: "text" },
  { label: "białka (%)", key: "proteinProcent", type: "number" },
  { label: "tłuszcze (%)", key: "fatProcent", type: "number" },
  { label: "węglowodany (%)", key: "carbohydratesProcent", type: "number" },
];

const AllDietEstablishments = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  const [pageCount, setPageCount] = useState(0);

  const {
    dietEstablishments,
    dietEstablishmentsError,
    dietEstablishmentsLoading,
    pagination,
  } = useDietEstablishments(page.toString(), itemsPerPage);

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  // if (measurementsLoading) return <div>measurements loading...</div>;
  // if (dietEstablishmentsError || !dietEstablishments)
  //   return <div>diet establishments error</div>;

  console.log({ dietEstablishments });

  const dietEstablishmentData = dietEstablishments?.map((data) => ({
    _id: data._id,
    name: data.name,
    client: data.patient.fullName,
    createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    kcal: data.kcal,
    proteinProcent: data.protein.procent,
    fatProcent: data.fat.procent,
    carbohydratesProcent: data.carbohydrates.procent,
  }));

  const deleteDietEstablishments = () => {
    return;
  };

  return (
    <>
      <PageNav
        headingTitle={"Założenia żywieniowe"}
        pageNavLinks={dietEstablishmentsNavLinks}
      />
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/diet-establishments/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={dietEstablishmentData}
          loadingData={dietEstablishmentsLoading}
          columns={columns}
          viewLink="/dashboard/diet-establishments"
          editLink="/dashboard/diet-establishments"
          deleteAction={deleteDietEstablishments}
          gridViewImage={EstablishmentImg}
          renderKey="_id"
          renderLabel="name"
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

export default AllDietEstablishments;
