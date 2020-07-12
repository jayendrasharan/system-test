import { map, get } from "lodash";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fields } from "../../constants";
import { groupByTodo } from "../../redux/actions";
import Select from "react-select";

//Creates the dropdown for Grouping
function GroupByDropdown() {
    const properties = useSelector(state => state.properties);
    let dispatch = useDispatch();

    let groupByOptions = [{
        label: "None",
        value: "",
    }];
    map(fields, field => {
        if (field.groupby) {
            groupByOptions.push({
                label: field.label,
                value: field.value,
            })
        }
    })

    return (
        <Select
            className="col-lg-3 groupby-dropdown"
            options={groupByOptions}
            value={groupByOptions.find(option =>
                get(option,"value") === properties.groupBy)}
            onChange={(selectedOption) => dispatch(groupByTodo(selectedOption.value))}
        />
    );
}


export default GroupByDropdown;