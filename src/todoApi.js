const storageKey = "TODO_ITEMS";
const delayMs = 300;

function getFromStorage() {
    const fromStorage = localStorage.getItem(storageKey);
    return fromStorage ? JSON.parse(fromStorage) : [];
}

function get() {
    return new Promise(resolve => {
        setTimeout(() => resolve(getFromStorage()), delayMs);
    });
}

function completeTodo(todo) {
    const id = todo.id;
    return new Promise(resolve => {
        const items = getFromStorage();
        const updatedItems = items.map(item => (item.id === id ? { ...item, currentState: !item.currentState } : item));
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}

function deleteFromStorage({ id }) {
    return new Promise(resolve => {
        const items = getFromStorage();
        const updatedItems = items.filter(item => (item.id !== id ? true : false));
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}
  
function addToStorage(item) {
    return new Promise(resolve => {
        const items = getFromStorage();
        const newId = Math.random() * 1000 * new Date();
        const createdAt = new Date().toLocaleString();
        const currentState = true;
        const updatedItems = [...items, { ...item, id: newId, createdAt, currentState }];
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}
function editToStorage(editItem) {
    return new Promise(resolve => {
        const items = getFromStorage();
        const updatedItem = { ...editItem.todo, ...editItem.values };

        const updatedItems = items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}


export default { get, completeTodo, addToStorage, deleteFromStorage, editToStorage };
