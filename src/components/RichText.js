import React from "react";

const RichText = ({ value, searchText, isSearchable }) => {
  if (!isSearchable) {
    return <span>{value} </span>;
  }
  const searchResultIndex =
    searchText !== ""
      ? value.toLowerCase().indexOf(searchText.toLowerCase())
      : -1;
  if (searchResultIndex > -1) {
    return (
      <span>
        {value.substring(0, searchResultIndex)}
        <mark>
          {value.substring(
            searchResultIndex,
            searchResultIndex + searchText.length
          )}
        </mark>
        {value.substring(searchResultIndex + searchText.length)}
      </span>
    );
  } else {
    return <span>{value}</span>;
  }
};

export default RichText;
