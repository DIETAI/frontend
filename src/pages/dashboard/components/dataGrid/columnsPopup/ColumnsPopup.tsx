import React, { useEffect, useRef } from "react";

//styles
import * as Styled from "./ColumnsPopup.styles";

//icons
import * as Icon from "icons/icons";

//components
import IconButton from "components/iconButton/IconButton";

//react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//interfaces
import { IColumnsPopupProps } from "./ColumnsPopup.interfaces";

const ColumnsPopup = ({
  displayColumns,
  setDisplayColumns,
  availableColumns,
  setPopup,
}: IColumnsPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!popupRef.current?.contains(e.target as Node)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(displayColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDisplayColumns(items);
  };

  return (
    <Styled.ColumnsPopupWrapper ref={popupRef}>
      <Styled.ColumnPopupHeading>wyświetlane kolumny</Styled.ColumnPopupHeading>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="displayColumns">
          {(provided) => (
            <Styled.ColumnsPopupList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {displayColumns.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <Styled.ColumnsPopupItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      disabledItem={false}
                      offItem={false}
                    >
                      <div>
                        <Icon.FaBars />
                        {item.label}
                      </div>

                      {displayColumns.length > 1 && (
                        <IconButton
                          icon={<Icon.FaTrash />}
                          onClick={() => {
                            setDisplayColumns(
                              displayColumns.filter(
                                ({ label }) => label !== item.label
                              )
                            );
                          }}
                        />
                      )}
                    </Styled.ColumnsPopupItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Styled.ColumnsPopupList>
          )}
        </Droppable>
      </DragDropContext>

      <Styled.ColumnPopupHeading>dostępne kolumny</Styled.ColumnPopupHeading>
      <Styled.ColumnsPopupList>
        {availableColumns.map((item) => (
          <Styled.ColumnsPopupItem
            key={item.key}
            disabledItem={displayColumns.length >= 5}
            offItem={displayColumns
              .map(({ label }) => label)
              .includes(item.label)}
          >
            {item.label}

            {displayColumns.length < 5 && (
              <IconButton
                icon={<Icon.FaLongArrowAltUp />}
                onClick={() => {
                  setDisplayColumns([...displayColumns, item]);
                }}
              />
            )}
          </Styled.ColumnsPopupItem>
        ))}
      </Styled.ColumnsPopupList>
    </Styled.ColumnsPopupWrapper>
  );
};

export default ColumnsPopup;
