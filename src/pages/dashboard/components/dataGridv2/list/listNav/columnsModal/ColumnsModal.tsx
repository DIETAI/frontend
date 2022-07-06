import React from "react";

//styles
import * as Styled from "./ColumnsModal.styles";

//react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//interfaces
import { IDataGridProps } from "../../../DataGrid.interfaces";

//icons
import { FaBars, FaTrash, FaLongArrowAltUp } from "icons/icons";

//components
import IconButton from "components/iconButton/IconButton";

interface IColumnsModalProps {
  columns: IDataGridProps["columns"];
  changeDisplayColumns: (columns: any) => void;
  displayColumns: any[];
}

const ColumnsModal = ({
  columns,
  changeDisplayColumns,
  displayColumns,
}: IColumnsModalProps) => {
  const handleOnDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(displayColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    changeDisplayColumns(items);
  };

  return (
    <Styled.ColumnsModalWrapper>
      <Styled.ColumnsModalHeadingWrapper>
        wyświetlane kolumny
      </Styled.ColumnsModalHeadingWrapper>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="displayColumns">
          {(provided) => (
            <Styled.ColumnsModalList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {displayColumns.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <Styled.ColumnsModalItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      disabledItem={false}
                      offItem={false}
                    >
                      <div>
                        <FaBars />
                        {item.label}
                      </div>

                      {displayColumns.length > 1 && (
                        <IconButton
                          icon={<FaTrash />}
                          onClick={() => {
                            changeDisplayColumns(
                              displayColumns.filter(
                                ({ label }) => label !== item.label
                              )
                            );
                          }}
                        />
                      )}
                    </Styled.ColumnsModalItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Styled.ColumnsModalList>
          )}
        </Droppable>
      </DragDropContext>
      <Styled.ColumnsModalHeadingWrapper>
        dostępne kolumny
      </Styled.ColumnsModalHeadingWrapper>
      <Styled.ColumnsModalList>
        {columns.map((item) => (
          <Styled.ColumnsModalItem
            key={item.key}
            disabledItem={displayColumns.length >= 5}
            offItem={displayColumns
              .map(({ label }) => label)
              .includes(item.label)}
          >
            {item.label}

            {displayColumns.length < 5 && (
              <IconButton
                icon={<FaLongArrowAltUp />}
                onClick={() => {
                  changeDisplayColumns([...displayColumns, item]);
                }}
              />
            )}
          </Styled.ColumnsModalItem>
        ))}
      </Styled.ColumnsModalList>
    </Styled.ColumnsModalWrapper>
  );
};

export default ColumnsModal;
