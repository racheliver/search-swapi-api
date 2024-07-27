import { JSX } from "react";

export type OperationType = 'applyQueryStyle' | 'formatAttributeName' | 'capitalizeChar' | 'generateUniqueId';

export interface FunctionTypes {
  applyQueryStyle: [text: string, query: string, uniqueId: string];
  formatAttributeName: [attr: string];
  capitalizeChar: [text: string];
  generateUniqueId: [prefix: string];
}

export type UnifiedFunctionArgs = {
  [K in keyof FunctionTypes]: [K, ...FunctionTypes[K]]
}[keyof FunctionTypes];

export type FunctionReturnTypes = {
  applyQueryStyle: JSX.Element[];
  formatAttributeName: string;
  capitalizeChar: string;
  generateUniqueId: string;
}

export type UnifiedFunctionReturn = FunctionReturnTypes[OperationType];