export const createExpenseFormRef = (state, actions) => {
  return {
    ...state,
    refs: {
      ...state.refs,
      single_expense_form: actions.ref,
    },
  };
};
