import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'
import styled from 'styled-components'

const Div = styled.div`
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  height: 48px;
`

const Tabs = () => (
  <Div>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      All ToDos
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active ToDos
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed ToDos
    </FilterLink>
  </Div>
)

export default Tabs
