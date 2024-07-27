import axios from 'axios';
import { v4 as uuid } from 'uuid';
import {IItem} from '../types/itemTypes';
import { ApiResponse, EntityDefinitions } from '../types/apiTypes';

export const ENTITY_DEFINITIONS: EntityDefinitions = {
  people: {
    name: "people",
    title: "People",
    attributes: ["name", "gender", "birth_year"],
  },
  planets: {
    name: "planets",
    title: "Planets",
    attributes: ["name", "climate", "terrain"],
  },
  films: {
    name: "films",
    title: "Films",
    attributes: ["title", "director", "release_date"],
  },
  species: {
    name: "species",
    title: "Species",
    attributes: [
      "name",
      "classification",
      "designation",
      "average_height",
      "average_lifespan",
    ],
  },
  starships: {
    name: 'starships',
    title: 'Starships',
    attributes: ['name', 'model', 'starship_class', 'hyperdrive_rating']
  },
  vehicles: {
    name: 'vehicles',
    title: 'Vehicles',
    attributes: ['name', 'model', 'vehicle_class', 'cargo_capacity', 'length']
  }
};

export const ENTITIES: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
export const API_BASE_URL: string = "https://swapi.dev/api/";

export const retrieveEntityData = async (entity: string): Promise<IItem[]> => {
  const response = await axios.get<ApiResponse<any>>(`${API_BASE_URL}${entity}`);
  return response.data.results.map((item) => ({ id: uuid(), ...item }));
};

export const fetchEntityDataAndSetState = async (entity: string, setState: (data: IItem[]) => void): Promise<void> => {
  const entityData = await retrieveEntityData(entity);
  setState(entityData);
};


export const initializeSearchResults = (): Record<string, any[]> => {
  return ENTITIES.reduce((acc: Record<string, any[]>, category: string) => {
    acc[category] = [];
    return acc;
  }, {});
};
