import React from "react";
import { GROUPBY_OPTIONS } from "./group-by-constants";
import "./group-by.scss"

function GroupBy(props) {
    const { groupedBy, setGroupedBy } = props;
    const groupedByOptions = GROUPBY_OPTIONS.map((groupedByOption, index) => {
        let valueOfOption = groupedByOption.split(" ").join("_");
        return (<option key={index} value={valueOfOption.toLowerCase()}>{groupedByOption}</option>)
    });
    return (
        <div className="group-by-dropdown-container">
            <select
                id="group-by"
                value={groupedBy}
                onChange={(event) => setGroupedBy(event.target.value)}
            >
                {groupedByOptions}
            </select>
        </div>
    )
}

export default GroupBy;
