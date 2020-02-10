const SET_FORM_TO_EDIT = "SET_FORM_TO_EDIT";
const CLEAR_FROM_TO_EDIT = "CLEAR_FROM_TO_EDIT";

export const setFormToEdit = data => {
  return {
    type: SET_FORM_TO_EDIT,
    payload: data
  };
};

export const clearFormToEdit = data => {
  return {
    type: CLEAR_FROM_TO_EDIT
  };
};

const FormEditReducer = (state = null, action) => {
  switch (action.type) {
    case SET_FORM_TO_EDIT:
      return (state = action.payload);
    case CLEAR_FROM_TO_EDIT:
      return (state = null);

    default:
      return state;
  }
};

export default FormEditReducer;
