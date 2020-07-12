import { Priorities, CurrentStates } from './constants';

export function getFieldValue(value, type) {
    if(type === "dueDate") {
        return new Date(value).toLocaleDateString();
    } else if(type === "priority") {
        return Priorities[value];
    } else if(type === "currentState") {
        return CurrentStates.find(current => current.value===value).label;
    }
    return value;
}
