import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProducts } from "services/getProducts";
import EstablishmentImg from "assets/establishment.svg";

//date-fns
import format from "date-fns/format";

//components
import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";
import { getDietKinds } from "services/getDietKinds";

const columns: IColumn[] = [
  { label: "nazwa", key: "name", type: "text" },
  { label: "typ", key: "type", type: "text" },
];

const dietKindTypeRender = (type: "healing" | "unconventional" | "other") => {
  if (type === "healing") {
    return "lecznicza";
  }
  if (type === "unconventional") {
    return "niekonwencjonalna";
  }
  if (type === "other") {
    return "inna";
  }
};

const AllDietKinds = () => {
  const { t } = useTranslation();
  // const [page, setPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  // const [pageCount, setPageCount] = useState(0);
  const { dietKinds, dietKindsError, dietKindsLoading } = getDietKinds();

  // useEffect(() => {
  //   if (pagination) {
  //     setPageCount(pagination.pageCount);
  //   }
  // }, [pagination]);

  // const handleBack = () => {
  //   if (page === 1) return;
  //   setPage(page - 1);
  // };

  // const handleNext = () => {
  //   if (page === pageCount) return;
  //   setPage(page + 1);
  // };

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dietKindsError || !dietKinds) return <div>dietKinds error</div>;

  const dietKindsData = dietKinds?.map((data) => ({
    _id: data._id,
    name: data.name,
    type: dietKindTypeRender(data.type),
  }));

  const deleteDietKind = () => {
    console.log("delete dietKind");
  };

  return (
    <>
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/admin/dietKinds/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={dietKindsData}
          loadingData={dietKindsLoading}
          columns={columns}
          viewLink="/dashboard/admin/dietKinds"
          editLink="/dashboard/admin/dietKinds/edit"
          deleteAction={deleteDietKind}
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

export default AllDietKinds;
