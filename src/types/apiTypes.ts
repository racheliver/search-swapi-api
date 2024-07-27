export interface EntityAttributes {
  name: string;
  title: string;
  attributes: string[];
}

export interface EntityDefinitions {
  [key: string]: EntityAttributes;
}

export interface ApiResponse<T> {
  results: T[];
}
