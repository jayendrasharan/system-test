import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <div>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All Tasks</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Pending</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
)

export default Footer