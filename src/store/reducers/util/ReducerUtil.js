export const getUpdatedResponse = (state, startIndex, count, elementToReplace) => {
  const newApiResponse = [...state.apiResponse];
  newApiResponse.splice(startIndex, count, elementToReplace);
  return newApiResponse;
};
