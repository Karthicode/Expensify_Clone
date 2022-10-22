export const openDialog = (state, action) => {
  console.log("entered in open Dialog");
  return {
    ...state,
    dialog: { ...action.dialog },
  };
};
