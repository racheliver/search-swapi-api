export interface IItem {
    id: string;
    name: string;
    category: string;
    [key: string]: any;
  }
  
  export interface ICachedData {
    [category: string]: IItem[];
  }
  
  export interface State {
    cachedData: ICachedData;
    currentCategory: string | null;
  }
  
  export type Action =
    | { type: 'ADD_ITEM'; payload: IItem }
    | { type: 'EDIT_ITEM'; payload: IItem }
    | { type: 'DELETE_ITEM'; payload: { id: string; category: string } }
    | { type: 'SET_CATEGORY_DATA'; payload: { category: string; data: IItem[] } }
    | { type: 'SET_CURRENT_CATEGORY'; payload: string };
  