export const searchFilters = (state, action) => {
  switch (action.name) {
    case "from_date":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          from_date: action.from_date,
        },
      };
    case "to_date":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          to_date: action.to_date,
        },
      };
    case "merchant":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          merchant: action.merchant,
        },
      };
    case "category":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          category: action.category,
        },
      };
    case "expense_type":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          expense_type: action.expense_type,
        },
      };
    case "report_type":
      let report_type_array = [...state.searchFilters.report_type];
      let report_type_index = report_type_array.indexOf(action.report_type);

      if (report_type_index === -1) {
        report_type_array.push(action.report_type);
      } else {
        report_type_array = report_type_array.filter(
          (type, index) => index !== report_type_index
        );
      }

      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          report_type: report_type_array,
        },
      };
    case "sort_by":
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          sort_by: action.sort_by,
        },
      };

    default:
      return state.searchFilters;
  }
};
