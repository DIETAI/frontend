import React, { useState } from "react";
import { useNavigate } from "react-router";

//styles
import * as Styled from "./DataGridList.styles";

//Icons
import * as Icon from "icons/icons";

//components
import IconButton from "components/iconButton/IconButton";
import CheckedPopup from "../checkedPopup/CheckedPopup";
import ColumnsPopup from "../columnsPopup/ColumnsPopup";

import CheckboxWrapper from "components/checkbox/CheckboxWrapper";
import EmptyGrid from "../emptyGrid/EmptyGrid";

//animations
import { AnimatePresence } from "framer-motion";
//interfaces
import { IDataGridListProps } from "./DataGridList.interfaces";

const DataGridList = ({
  availableColumns,
  dataRows,
  checkedRows,
  handleCheckedRows,
  loading,
  linkPage,
  deleteAction,
}: IDataGridListProps) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const [displayColumns, setDisplayColumns] = useState(
    availableColumns.slice(0, 5)
  );

  return (
    <>
      {dataRows.length === 0 && !loading && <EmptyGrid />}
      {dataRows.length > 0 && (
        <Styled.DataGridListContainer>
          <Styled.DataGridListWrapper>
            <Styled.DataGridListHeader>
              <Styled.DataGridListConfig>
                <CheckboxWrapper
                  onClick={() => handleCheckedRows()}
                  checked={checkedRows.length === dataRows.length}
                />
              </Styled.DataGridListConfig>

              {checkedRows.length < 1 && (
                <>
                  {displayColumns.map((heading) => (
                    <Styled.DataGridListHeaderItem key={heading.key}>
                      <p> {heading.label}</p>
                    </Styled.DataGridListHeaderItem>
                  ))}

                  <Styled.DataGridListConfig>
                    <IconButton
                      onClick={() => setPopup(true)}
                      icon={<Icon.FaCog />}
                    />
                  </Styled.DataGridListConfig>
                </>
              )}
            </Styled.DataGridListHeader>

            <Styled.DataGridListRowsWrapper>
              {dataRows.map((row) => (
                <Styled.DataGridListRow
                  key={row._id}
                  onClick={() => {
                    navigate(`${linkPage}/${row._id}`);
                  }}
                >
                  <Styled.DataGridListConfig>
                    <CheckboxWrapper
                      onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleCheckedRows(row);
                      }}
                      checked={checkedRows.includes(row)}
                    />
                  </Styled.DataGridListConfig>
                  {displayColumns.map((column) => (
                    <Styled.DataGridListRowItem key={column.key}>
                      <p>{row[column.key]}</p>
                    </Styled.DataGridListRowItem>
                  ))}

                  <Styled.DataGridListConfig>
                    {/* <IconButton
                      icon={<Icon.FaEdit />}
                      onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        e.preventDefault();

                        navigate(`${linkPage}/edit/${row._id}`);
                      }}
                    /> */}
                    <IconButton
                      icon={<Icon.FaEdit />}
                      onClick={() => navigate(`${linkPage}/edit/${row._id}`)}
                    />
                  </Styled.DataGridListConfig>
                </Styled.DataGridListRow>
              ))}
            </Styled.DataGridListRowsWrapper>
          </Styled.DataGridListWrapper>
          {popup && (
            <ColumnsPopup
              displayColumns={displayColumns}
              setDisplayColumns={setDisplayColumns}
              availableColumns={availableColumns}
              setPopup={setPopup}
            />
          )}

          <AnimatePresence>
            {checkedRows.length > 0 && (
              <CheckedPopup
                checkedRows={checkedRows}
                deleteAction={deleteAction}
              />
            )}
          </AnimatePresence>
        </Styled.DataGridListContainer>
      )}
    </>
  );
};

export default DataGridList;
