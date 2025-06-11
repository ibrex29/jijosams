import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    cursor: "pointer",
  },
  searchInput: {
    width: 0,
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
  },
  expanded: {
    width: "200px",
  },
  // Adding media query for responsiveness
  '@media (max-width: 600px)': {
    expanded: {
      width: "150px", // Reduced width for smaller screens
    },
  },
});

const ExpandingSearchBar = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      // Add your search logic here
    }
  };

  return (
    <div className={classes.searchContainer}>
      <IconButton className={classes.searchIcon} onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search Portal..."
        className={`${classes.searchInput} ${expanded ? classes.expanded : ""}`}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
};

export default ExpandingSearchBar;
