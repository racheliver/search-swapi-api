import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDisplay from "./SearchDisplay";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {SearchContainer,SearchBar,SearchInput,SearchPopup,Snackbar,Alert } from "@src/styles/SearchStyles";
import { useSearch } from "@src/hooks/useSearch";
import { CircularProgress, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useItemContext } from "@src/context/ItemContext";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const { queryResults, loading, errorOpen, handleCloseSnackbar } = useSearch(query);
  const navigate = useNavigate();
  const { state, dispatch } = useItemContext();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setPopupVisible(false);
      return;
    }
    setPopupVisible(true);
  };
  const handleViewAll = (category: string) => {
    if (state.cachedData[category]) {
      dispatch({
        type: "SET_CATEGORY_DATA",
        payload: { category, data: state.cachedData[category] },
      });
    }
    dispatch({ type: "SET_CURRENT_CATEGORY", payload: category });
    navigate(`/category/${category}`);
    setPopupVisible(false);
  };
  const handleClickAway = () => {
    setPopupVisible(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <SearchContainer>
          <SearchBar>
            <SearchInput
              type="text"
              id="search"
              placeholder="Discover Star Wars characters, planets, and more..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className={popupVisible ? "search-input open" : "search-input"}
            />
            <IconButton
              style={{ cursor:'none', position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--search-icon-color)' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
            </IconButton>
            {popupVisible && (
              <SearchPopup>
                {Object.keys(queryResults).map((category) => (
                  <SearchDisplay
                    key={category}
                    results={queryResults[category]}
                    entity={category}
                    onViewAll={handleViewAll}
                    query={query}
                  />
                ))}
              </SearchPopup>
            )}
          </SearchBar>
        </SearchContainer>
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Sorry, there was a problem with the API. Please try again.
          </Alert>
        </Snackbar>
      </div>
    </ClickAwayListener>
  );
};

export default Search;
