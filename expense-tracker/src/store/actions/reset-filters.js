export const resetSearchFilters = (state, action) => {
  console.log(action);

  return {
    ...state,
    searchFilters: {
      ...action.reset_filters,
    },
  };
};
