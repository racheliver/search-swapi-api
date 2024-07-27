import React from "react";
import { 
  UnifiedFunctionArgs, 
  UnifiedFunctionReturn, 
  FunctionTypes 
} from '../types/unifiedFunctionTypes';

let idCounter = 0;

export function manipulationString(...args: UnifiedFunctionArgs): UnifiedFunctionReturn {
  const [operation, ...rest] = args;

  switch (operation) {
    case 'applyQueryStyle': {
      const [text, query, uniqueId] = rest as FunctionTypes['applyQueryStyle'];
      if (!query) return [<React.Fragment key={uniqueId}>{text}</React.Fragment>];
      const regex = new RegExp(`(${query})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, index) =>
        regex.test(part) 
          ? <strong key={`${uniqueId}-${index}`} className="queryStyle">{part}</strong> 
          : <React.Fragment key={`${uniqueId}-${index}`}>{part}</React.Fragment>
      );
    }

    case 'formatAttributeName': {
      const [attr] = rest as FunctionTypes['formatAttributeName'];
      return attr.replace(/_/g, ' ');
    }

    case 'capitalizeChar': {
      const [text] = rest as FunctionTypes['capitalizeChar'];
      if (!text) return '';
      const lowerText = text.toLowerCase();
      return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
    }

    case 'generateUniqueId': {
      const [prefix] = rest as FunctionTypes['generateUniqueId'];
      idCounter += 1;
      return `${prefix}-${idCounter}`;
    }

    default:
      throw new Error('Invalid operation type');
  }
}
