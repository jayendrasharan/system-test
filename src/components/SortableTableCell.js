/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 10:59 PM
 */

import React from 'react';
import {Button} from "react-bootstrap";
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa';
import styled from "styled-components";

const StyledTaskHeaderCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const getSortIcon = (sortOrder, sortKey, dataKey) => {
    if (dataKey === sortKey) {
        switch (sortOrder) {
            // Sorted Descending
            case -1:
                return <FaSortDown/>;
            // Sorted Ascending
            case 1:
                return <FaSortUp/>;
            // Default Sort
            default:
                return <FaSort/>;
        }
    } else {
        return <FaSort/>;
    }
}

export default class SortableTableCell extends React.Component {
    render() {
        const {children, sortable, sortOrder = 0, dataKey, sortKey, handleSetSort} = this.props;
        return (
            <td>
                <StyledTaskHeaderCell>
                    {children}
                    {
                        sortable && <Button variant={"dark"} size={"sm"} onClick={() => {
                            handleSetSort({
                                sortOrder: sortKey === dataKey ? ((sortOrder + 2) % 3) - 1 : -1,
                                sortKey: dataKey
                            })
                        }}>
                            {getSortIcon(sortOrder, sortKey, dataKey)}
                        </Button>
                    }
                </StyledTaskHeaderCell>
            </td>
        );
    }
}