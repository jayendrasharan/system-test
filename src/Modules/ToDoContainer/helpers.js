
export const sortColumns = (todos, sortColumn, currentState) => {
    
    if (sortColumn === null) return todos;
    let updatedTodos = [...todos];
    updatedTodos.sort((a, b) =>
        currentState === "asc"
            ? a[sortColumn] > b[sortColumn]
                ? 1
                : -1
            : a[sortColumn] > b[sortColumn]
                ? -1
                : 1
    );
    return updatedTodos;
};

export const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};





