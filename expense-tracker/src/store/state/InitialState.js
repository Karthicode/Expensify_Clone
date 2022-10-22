export const initialState = {
  user: {},
  isAuthenticated:null,
  dialog: {
    trigger: false,
    src: "",
  },
  searchFilters: {
    from_date: null,
    to_date: null,
    merchant: "",
    category: "",
    expense_type: "",
    report_type: [],
    sort_by: "",
  },
  uploadedImage: null,
};
