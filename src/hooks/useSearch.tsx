import { useState, useEffect } from "react";
import axios from "axios";
import {
  ENTITIES,
  API_BASE_URL,
  initializeSearchResults,
} from "../utils/StarWarsAPI";
import { manipulationString } from "../utils/helper";

interface SearchResults {
  [key: string]: any[];
}

interface ApiResponse<T> {
  results: T[];
}

export const useSearch = (query: string) => {
  const [queryResults, setQueryResults] = useState<SearchResults>(
    initializeSearchResults()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string, retries = 3) => {
    if (!searchQuery) {
      setQueryResults(initializeSearchResults());
      return;
    }

    setLoading(true);

    try {
      const requests = ENTITIES.map((category) =>
        axios.get<ApiResponse<any>>(
          `${API_BASE_URL}${category}?search=${searchQuery}`
        )
      );
      const responses = await Promise.all(requests);

      const newResults: SearchResults = responses.reduce(
        (acc: SearchResults, response, index) => {
          acc[ENTITIES[index]] = response.data.results.map((item: any) => ({
            ...item,
            uniqueId: manipulationString('generateUniqueId',ENTITIES[index]),
          }));
          return acc;
        },
        {} as SearchResults
      );

      setQueryResults(newResults);
    } catch (error) {
      console.error(`Error searching: ${error}`);
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        setTimeout(() => handleSearch(searchQuery, retries - 1), 1000);
      } else {
        setErrorOpen(true);
      }
    } finally {
      if (retries === 3) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const searchWithDelay = setTimeout(() => {
      handleSearch(query);
    }, 250);

    return () => clearTimeout(searchWithDelay);
  }, [query]);

  const handleCloseSnackbar = () => {
    setErrorOpen(false);
  };

  return {
    queryResults,
    loading,
    errorOpen,
    handleCloseSnackbar,
  };
};