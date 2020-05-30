const settings = {
    "grid": {
        "gridHeaderData": [
            { header: "Currrent State" },
            { header: "Title" },
            { header: "Description" },
            { header: "createdAt" },
            { header: "dueDate" },
            { header: "priority" }
        ],
        "allTasks": {
            "gridTableData": [
                { fieldName: "Open", title: "Title1", description: "description1", createdAt: "01/01/2019", dueDate: "01/02/2019", priority: "Low" },
                { fieldName: "Done", title: "Title2", description: "description2", createdAt: "02/01/2019", dueDate: "02/02/2019", priority: "High" },
                { fieldName: "Open", title: "Title3", description: "description3", createdAt: "03/01/2019", dueDate: "03/02/2019", priority: "Medium" },
                { fieldName: "Done", title: "Title4", description: "description4", createdAt: "04/01/2019", dueDate: "04/02/2019", priority: "low" },
                { fieldName: "Pending", title: "Title5", description: "description5", createdAt: "05/01/2019", dueDate: "05/02/2019", priority: "Medium" }
            ]
        },
        "completed": {
            "gridTableData": [
                { fieldName: "Done", title: "Title2", description: "description2", createdAt: "02/01/2019", dueDate: "02/02/2019", priority: "High" },
                { fieldName: "Done", title: "Title4", description: "description4", createdAt: "04/01/2019", dueDate: "04/02/2019", priority: "low" }

            ]
        },
        "pending": {
            "gridTableData": [
                { fieldName: "Pending", title: "Title5", description: "description5", createdAt: "05/01/2019", dueDate: "05/02/2019", priority: "Medium" }

            ]
        }

    },
    "addTask":{
        "inputControls":[
            {name:"title",labelName:"Summary:",inputType:"input",fieldValue:"title"},
            {name:"description",labelName:"Description:",inputType:"textArea",fieldValue:"description"},
            {name:"priority",labelName:"Priority:",inputType:"dropDown",fieldValue:"priority"},
            {name:"dueDate",labelName:"Due Date:",inputType:"datePicker",fieldValue:"dueDate"}
        ],
        "formValues": {
            "title": "",
            "description": "",
            "priority": "None",
            "dueDate": new Date(),
            "fieldName":"Pending",
            "createdAt":new Date()
        },
        "options":["None","Low","Medium","High"],
        "labelAddNewTask":"Add New Task"
    },
    "tabs":{
        "unselectedTabNames":[
            { id: 0,key:"allTasks", name: "All tasks", selected: false }, { id: 1,key:"completed", name: "Completed", selected: false },
            { id: 2,key:"pending", name: "Pending", selected: false }
        ]
    },
    
    
}

export default settings;