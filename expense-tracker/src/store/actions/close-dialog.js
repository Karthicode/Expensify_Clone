export const closeDialog = (state, action) => {
  return {
    ...state,
    dialog: { ...action.dialog },
  };
};
