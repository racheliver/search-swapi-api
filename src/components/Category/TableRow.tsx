import React, { useState } from "react";
import { IItem } from '@src/types/itemTypes';
import { useItemContext } from "@src/context/ItemContext";
import { TableRowContainer, TableCell, ActionButton } from '@src/styles/TableRowStyles';
import Form from "./Form/Form";

interface TableRowProps {
  entityListData: IItem;
  attributes: string[];
  removeItemById: () => void;
  category: string;
}

const TableRow: React.FC<TableRowProps> = ({ entityListData, attributes, removeItemById, category }) => {
  const { dispatch } = useItemContext();
  const [item, setItem] = useState<IItem>(entityListData);
  const [formState, setFormState] = useState<boolean>(false);
  const [formType, setFormType] = useState<"update" | "delete">("update");

  const openForm = (type: "update" | "delete") => {
    setFormType(type);
    setFormState(true);
  };

  const closeForm = () => {
    setFormState(false);
  };

  const handleEditItem = (id: string, updates: IItem) => {
    const editedItem = { ...item, ...updates };
    dispatch({ type: 'EDIT_ITEM', payload: { ...editedItem, id, category } });
    setItem(editedItem);
    closeForm();
  };

  const handleDeleteItem = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: { id, category } });
    removeItemById();
    closeForm();
  };

  return (
    <>
      <TableRowContainer>
        {attributes.map((header) => (
          <TableCell key={header}>
            {item[header] || ""}
          </TableCell>
        ))}
        <TableCell>
          <ActionButton onClick={() => openForm("update")}>Edit</ActionButton>
          <ActionButton onClick={() => openForm("delete")}>Delete</ActionButton>
        </TableCell>
      </TableRowContainer>
      {formState && (
        <TableRowContainer>
          <TableCell colSpan={attributes.length + 1}>
            <Form
              type={formType}
              open={formState}
              close={closeForm}
              attributes={attributes}
              entityListData={item}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
              id={item.id}
            />
          </TableCell>
        </TableRowContainer>
      )}
    </>
  );
};

export default TableRow;
