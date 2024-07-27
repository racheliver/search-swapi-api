import React from "react";
import { manipulationString } from "@src/utils/helper";
import {
  ResultsContainer,
  ResultsHeader,
  ResultsTitle,
  ResultsList,
  ResultsItem,
  ViewAllButton,
} from "@src/styles/SearchDisplayStyles";

interface SearchResult {
  uniqueId: string;
  name?: string;
  title?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  entity: string;
  maxResults?: number;
  onViewAll: (category: string) => void;
  query: string;
}

const SearchDisplay: React.FC<SearchResultsProps> = ({
  results,
  entity,
  maxResults = 3,
  onViewAll,
  query,
}) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <ResultsContainer className="results-container">
      <ResultsHeader>
        <ResultsTitle>{entity}</ResultsTitle>
        <ViewAllButton className="view-all-button" onClick={() => onViewAll(entity)}>
          View All
        </ViewAllButton>
      </ResultsHeader>
      <ResultsList>
        {results.slice(0, maxResults).map((result) => (
          <ResultsItem key={result.uniqueId}>
            {manipulationString('applyQueryStyle',
              result.name || result.title || "",
              query,
              result.uniqueId
            )}
          </ResultsItem>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

export default SearchDisplay;
