import React from "react"
import "./search.scss"
import Icon from "../icon/icon";
import { AVAILABLE_ICONS_CLASS } from "../icon/icon-constants"

function Search(props) {
    const { SEARCH_ICON } = AVAILABLE_ICONS_CLASS;

    const { searchValue, handleSearchValue } = props;

    const handleInputValue = (event) => {

        handleSearchValue(event.target.value);
    }

    return (
        <div className="search-container">
            <Icon className={SEARCH_ICON} fontSize="24px" />
            <input placeholder="Search by Summary..." value={searchValue} onChange={handleInputValue} />
        </div>
    )
}

export default Search
