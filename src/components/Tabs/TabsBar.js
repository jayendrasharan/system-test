import styled from "styled-components";

export const TabsBars = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid grey;
`
export const TabsBar = styled.li`
    display: inline;
    border: solid;
    border-width: 1px 1px 0 1px;
    margin: 0 5px 0 0;
    padding: 5px 5px 11px 5px;
    :active {
        padding-bottom: 12px;
        background: #fff;
    }
`
