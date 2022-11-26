import React, { useEffect } from "react";

//icons
import { FaExclamationCircle } from "react-icons/fa";

//styles
import * as Styled from "./DataGridList.styles";

//animations
import { AnimatePresence } from "framer-motion";

//context
import { useDataGridView } from "../context/DataGridViewProvider";
import { useDataGridSearch } from "../context/DataGridSearch.context";
import { useDataGridSelect } from "../context/DataGridSelect.context";

//interfaces
import { IDataGridListProps } from "./DataGridList.interfaces";

//components
import DataGridLineView from "./lineView/DataGridLineView";
import GridView from "./gridView/GridView";
import LoadingGrid from "../loading/LoadingGrid";
import EmptyGrid from "../empty/EmptyGrid";

export interface IDataRow {
  _id: string;
  [key: string]: string | number;
}

const search = (currentData: IDataRow[], query: string) => {
  const columns = currentData[0] && Object.keys(currentData[0]);

  const dataFilter = currentData.filter((row) =>
    columns.some(
      (column) =>
        row[column]?.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  );

  return dataFilter;
};

const DataGridList = ({
  data,
  loadingData,
  errorData,
  columns,
  viewLink,
  editLink,
  deleteAction,
  gridViewImage,
  renderKey,
  renderLabel,
  renderImage,
}: IDataGridListProps) => {
  const { view } = useDataGridView();
  const { searchValue } = useDataGridSearch();
  const { selectedItems, unCheckAllItems } = useDataGridSelect();

  useEffect(() => {
    if (searchValue.length > 0 && selectedItems.length > 0) {
      return unCheckAllItems();
    }

    return;
  }, [searchValue, selectedItems]);

  if (errorData)
    return (
      <Styled.ErrorWrapper>
        <FaExclamationCircle />
        <h3>Wystąpił błąd podczas pobierania danych</h3>
      </Styled.ErrorWrapper>
    );

  return (
    <Styled.ListContainer>
      <AnimatePresence>
        {loadingData && (
          <Styled.LoadingWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingGrid />
          </Styled.LoadingWrapper>
        )}
      </AnimatePresence>
      {data && data.length > 0 && search(data, searchValue).length > 0 && (
        <>
          {view === "line" && (
            <DataGridLineView
              columns={columns}
              data={search(data, searchValue)}
              initialDataLength={data.length}
              linkPage={viewLink}
              editLink={editLink}
              deleteAction={deleteAction}
            />
          )}
          {view === "package" && (
            <GridView
              gridViewImage={gridViewImage}
              data={search(data, searchValue)}
              renderKey={renderKey}
              renderLabel={renderLabel}
              renderImage={renderImage}
              linkPage={viewLink}
            />
          )}
        </>
      )}
      {!data ||
        data.length < 1 ||
        (search(data, searchValue).length < 1 && <EmptyGrid />)}
    </Styled.ListContainer>
  );

  // if (view === "line")
  //   return (
  //     <DataGridLineView
  //       columns={columns}
  //       data={search(data, searchValue)}
  //       initialDataLength={data.length}
  //       linkPage={viewLink}
  //       editLink={editLink}
  //       deleteAction={deleteAction}
  //     />
  //   );

  // return (
  //   <GridView
  //     gridViewImage={gridViewImage}
  //     data={search(data, searchValue)}
  //     renderKey={renderKey}
  //     renderLabel={renderLabel}
  //     renderImage={renderImage}
  //     linkPage={viewLink}
  //   />
  // );
};

export default DataGridList;
