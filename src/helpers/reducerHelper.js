import { fieldSet } from "../config";

export const getNewTabState = (state, payload) => {
  let newPayload = { ...payload };
  if (newPayload.hasOwnProperty("sortBy")) {
    newPayload = {
      ...newPayload,
      sortOrder: state[payload.type].sortOrder === "asc" ? "desc" : "asc",
    };
  }
  return { ...state, [payload.type]: { ...state.allTab, ...newPayload } };
};

export const getNewSearchState = (state, payload) => {
  if (payload === "") return { ...state, searchKey: payload, searchResult: {} };

  let newObject = {};
  const searchableKeys = fieldSet.filter((item) => item.allowSearch).map((item) => item.name);
  state.tasks.forEach((item) => {
    newObject[item["_id"]] = false;
    let i = 0;
    while (i < searchableKeys.length) {
      if (item[searchableKeys[i]].toLowerCase().includes(payload.toLowerCase())) {
        newObject[item["_id"]] = true;
        break;
      }
      i++;
    }
  });
  return { ...state, searchKey: payload, searchResult: newObject };
};

export const getNewEditPayload = (state, payload) => {
  if (payload === undefined) {
    return { ...state, editPayload: undefined, showEditModal: !state.showEditModal };
  }
  const editPayload = state.tasks.filter((item) => item._id === payload)[0];
  return { ...state, editPayload, showEditModal: !state.showEditModal };
};
