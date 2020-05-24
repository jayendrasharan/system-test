import React from "react"
import { TABLE_HEADING_LABELS } from "./table-heading-constants"
import "./table-heading.scss"

function TableHeading(props) {
  const { SUMMARY, PRIORITY, CREATED_ON, DUE_DATE, ACTIONS } = TABLE_HEADING_LABELS
  const { sortTable } = props
  return (
    <tr>
      <th
        onClick={() => {
          sortTable("title")
        }}
        id="summary_heading"
      >
        {SUMMARY}
      </th>
      <th
        onClick={() => {
          sortTable("priority")
        }}
        id="priority_heading"
      >
        {PRIORITY}
      </th>
      <th
        onClick={() => {
          sortTable("createdDate")
        }}
        id="created_on_heading"
      >
        {CREATED_ON}
      </th>
      <th
        onClick={() => {
          sortTable("dueDate")
        }}
        id="due_date_heading"
      >
        {DUE_DATE}
      </th>
      <th>{ACTIONS}</th>
    </tr>
  )
}

export default TableHeading
