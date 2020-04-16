/**
 * Created by Rakesh Peela
 * Date: 16-Apr-2020
 * Time: 10:37 PM
 */

export const TaskModel = {
    currentState: {
        label: "Status",
        type: "boolean",
        allowSort: true,
        allowSearch: false,
        allowGroupBy: false,
    },
    title: {
        label: "Title",
        type: "string",
        allowSort: true,
        allowSearch: true,
        allowGroupBy: false,
        minLength: 10,
        maxLength: 140,
    },
    description: {
        label: "Description",
        type: "string",
        hidden: true,
        allowSort: false,
        allowSearch: true,
        allowGroupBy: false,
        minLength: 10,
        maxLength: 500,
    },
    createdOn: {
        label: "Created On",
        type: "date",
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
    },
    dueDate: {
        label: "Due By",
        type: "date",
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
    },
    priority: {
        label: "Priority",
        type: "string",
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
    }
}