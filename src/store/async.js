const API_CALL_STARTED = "API_CALL_STARTED";
const API_CALL_COMPLETED = "API_CALL_COMPLETED";

export const apiCallStarted = () => ({
  type: "API_CALL_STARTED"
});

export const apiCallCompleted = () => ({
  type: "API_CALL_COMPLETED"
});

const AsyncReducer = (state = false, action) => {
  switch (action.type) {
    case API_CALL_STARTED:
      return (state = true);
    case API_CALL_COMPLETED:
      return (state = false);
    default:
      return state;
  }
};
export default AsyncReducer;
