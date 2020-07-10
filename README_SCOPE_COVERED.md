## All the below features are implemented

Webapp can be accessed on below URL, which is deployed on firebase
https://sureify-32da6.web.app/

## Must haves - I

1.  ### How to add a task?

To add a task, click on the + button present at the bottom-right corner of the application. A modal will open with add-task-form.

2.  ### What happens when a user adds a task?

By default the task should be treated as an open task. This task should be added at the top of the list in both “All tasks” and “Pending” tasks tabs.

3.  ### How to view the detail of a task?
    Click on the task row. The modal should open read only view of _add-task-form_ with all fields filled in it.

**Note:** The add form will not contain all fields, for example created on, currentState (i.e. pending or open) but the view mode will contain such details. Make sure to add those detail in view mode.

4. ### How to edit a task?

To edit a task, click on the edit icon available in the Actions column of a row. When a user clicks on the edit icon, a modal will open with add-task-form. The values of the current task will be prefilled in the form.

Note: Unlike add, on editing the position of the task in the list should not change.

5.  ### How to delete a task?

To delete a task, click on the delete icon available in the Actions column of a row. When a user clicks on the delete icon, a modal will open with the task summary. The modal will also contain a question for the user: “Do you want to delete this task?”, with “Yes” and “No” action buttons.

The action buttons are self-explanatory. Check with us,if you need any help on this.

6.  ### How to mark a task as completed?

Click the done button available in the Actions column.

7.  ### What happens when a user marks a task as done?

    1.  In the all tasks lists, the style of the task should change. E.g. make the background green, or put a strikethrough in the row.
    2.  The “done” button should change to “re-open” in the actions column.
    3.  A copy of task should be moved to “Completed” tab.

8.  ### How to mark a task as pending?

Click the re-open button available in the Actions column.

9.  ### What happens when a user reopen a task?

    This is the exact opposite of marking a task as done.

    1.  In all tasks list, the style of tasks should become normal.
    2.  The “re-open” button should change to “done” button.
    3.  The task from “Completed” tab should be moved to “Pending”.

## Must haves - II

### Sorting

- If a column is sortable (see the structure/configuration), clicking on the column header should sort the list based on that column.

- If you are considering ASC as default, the first click should sort the list in ascending order.

- If the user clicks on the column header again, the order should become descending.

- Subsequent clicks on column header should alternate the sorting order.

### Searching

- If a user starts to type in the “Global Search” text input, perform a search on the page with the given keyword.

- While performing search, consider the “Allow search” key specified in the configuration.

- The search should be case-insensitive.

### Highlighting

- When there is a match, display the matched section of the text <mark> highlighted</mark>.

### Group By

- The dropdown will contain list of attributes for which “Allow group by” has the value yes.

- As per above mentioned structure, the group by drop down should contain
  - None
  - Created On
  - Pending On
  - Priority.
- Sample: If the user selects Priority from the dropdown, the list should become like the following:

| Summary        | Priority | Created on | Due date   | Actions |
| -------------- | -------- | ---------- | ---------- | ------- |
| High           |
| Task summary 1 | High     | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |
| Task summary 2 | High     | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |
| Medium         |
| Task summary 3 | Medium   | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |
| Task summary 4 | Medium   | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |
| None           |
| Task summary 5 | None     | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |
| Task summary 6 | None     | 12/07/2019 | 12/09/2019 | Edit    | Delete | Done |

- Give us a shout, if you need any further clarification on this.

**Note:** Sorting, searching, highlight, and group by - all these filters should persist when user changes the tab. For example, if the user has sorted the list on priority in ASC order in Completed tab, changing to All tasks tab should maintain the order.

## Must haves - III

1. If you are implementing your own modals, make sure we can close it by pressing escape key.
2. Add a short-cut for focusing user on global search. For example, if user presses Shift + Ctrl + F, focus on global search input text field.
3. Bulk action: Add checkbox in front of each row. Select multiple rows and perform bulk actions like delete and mark as done, mark as pending or any other applicable action.
