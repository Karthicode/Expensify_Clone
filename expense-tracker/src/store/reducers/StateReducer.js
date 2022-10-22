import * as actionIndex from "../actions/index.js";
import { createExpenseFormRef } from "../actions/create-expense-form-ref";
const {
  actions,
  setCurrentUser,
  openDialog,
  closeDialog,
  loginSuccess,
  logout,
  searchFilters,
  resetSearchFilters,
  uploadImageToStorage,
  removeImageFromStorage,
} = actionIndex;

export const StateReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    case actions.OPEN_DIALOG:
      return openDialog(state, action);
    case actions.CLOSE_DIALOG:
      return closeDialog(state, action);
    case actions.LOGIN:
      return loginSuccess(state, action);
    // case actions.LOGIN_FAILURE:
    //   return loginFailure(state, action);
    case actions.LOGOUT:
      return logout(state, action);

    case actions.CREATE_EXPENSE_FORM_REF:
      return createExpenseFormRef(state, action);
    case actions.SEARCH_FILTERS:
      return searchFilters(state, action);
    case actions.RESET_FILTERS:
      return resetSearchFilters(state, action);
    case actions.IMAGE_UPLOAD:
      return uploadImageToStorage(state, action);
    case actions.REMOVE_IMAGE:
      return removeImageFromStorage(state, action);
    default:
      return {
        ...state,
      };
  }
};
