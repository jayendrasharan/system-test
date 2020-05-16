import { orderBy } from 'lodash';

export const getOrderedTasks = (tasks, sortEle) => {
    return orderBy(tasks, Object.keys(sortEle)[0], Object.values(sortEle)[0]);
}