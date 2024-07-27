import { useState, useEffect, useMemo } from "react";
import {IItem} from '../types/itemTypes';
import { FormProps } from "../types/formTypes";

export const useForm = ({
  type,
  attributes,
  entityListData,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
  id,
}: FormProps) => {

  const initialState: IItem = useMemo(
    () =>
      attributes.reduce(
        (acc, attr) => {
          acc[attr] = "";
          return acc;
        },
        { id: "", name: "" } as IItem
      ),
    [attributes]
  );

  const formConfig = {
    add: {
      title: "Create a new item",
      buttonText: "Add",
      initialData: initialState,
    },
    update: {
      title: "Update an item",
      buttonText: "Update",
      initialData: entityListData,
    },
    delete: {
      title: "Confirm delete",
      buttonText: "Delete",
      initialData: {} as IItem,
    },
  };

  const { title, buttonText, initialData } = formConfig[type] || {};
  const [item, setItem] = useState<IItem>(initialData);

  useEffect(() => {
    setItem(initialData);
  }, [type, entityListData, initialData]);

  const handleChange = (attr: string, value: string) => {
    setItem((prev) => ({ ...prev, [attr]: value }));
  };

  const handleSubmit = () => {
    const actions = {
      add: () => handleAddItem?.(item),
      update: () => handleEditItem?.(id!, item),
      delete: () => handleDeleteItem?.(id!),
    };

    actions[type]();
  };

  return {
    item,
    title,
    buttonText,
    handleChange,
    handleSubmit,
  };
};
