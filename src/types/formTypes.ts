import {IItem} from './itemTypes';

export interface FormProps {
    type: "add" | "update" | "delete";
    attributes: string[];
    entityListData: IItem;
    open?: boolean;
    close?: () => void;
    handleAddItem?: (item: IItem) => void;
    handleEditItem?: (id: string, updates: IItem) => void;
    handleDeleteItem?: (id: string) => void;
    id?: string;
}