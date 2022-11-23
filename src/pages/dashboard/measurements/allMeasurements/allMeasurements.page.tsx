import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

//date-fns
import format from "date-fns/format";

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

//services
import { useMeasurements } from "services/useMeasurements";
import { measurementsNavLinks } from "../utlis/navLinks";

const columns: IColumn[] = [
  { label: "nazwa", key: "name", type: "text" },
  { label: "data", key: "createdAt", type: "text" },
  { label: "pacjent", key: "client", type: "text" },
  { label: "masa ciała", key: "weight", type: "text" },
  { label: "wysokość ciała", key: "height", type: "text" },
  { label: "bmi", key: "bmi", type: "text" },
  { label: "ppm (mifflin)", key: "ppmMifflin", type: "text" },
  { label: "ppm (harris)", key: "ppmHarris", type: "text" },
  { label: "cpm", key: "cpm", type: "text" },
];

const AllMeasurements = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  const [pageCount, setPageCount] = useState(0);

  const { measurements, measurementsError, measurementsLoading, pagination } =
    useMeasurements(page.toString(), itemsPerPage);

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  if (measurementsError) return <div>measurements error</div>;
  // if (measurementsLoading) return <div>measurements loading...</div>;

  console.log({ measurements });

  const measurementsData = measurements?.map((data) => ({
    _id: data._id,
    name: data.name,
    createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    client: data.measurementClient.fullName,
    weight: data.weight,
    height: data.height,
    bmi: data.bmi,
    ppmMifflin: data.ppmMifflin,
    ppmHarris: data.ppmHarris,
    cpm: data.cpm,

    // gender: data.gender,
  }));

  const deleteMeasurements = () => {
    return;
  };
  const deleteMeasurement = () => {
    console.log("delete measurement");
  };

  return (
    <>
      <PageNav headingTitle={"Pomiary"} pageNavLinks={measurementsNavLinks} />
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/measurements/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={measurementsData}
          loadingData={measurementsLoading}
          columns={columns}
          viewLink="/dashboard/measurements"
          editLink="/dashboard/measurements/edit"
          deleteAction={deleteMeasurement}
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

export default AllMeasurements;
