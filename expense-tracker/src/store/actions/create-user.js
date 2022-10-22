export const setCurrentUser = (state, action) => {
  return {
    ...state,
    user: action.data,
  };
};
