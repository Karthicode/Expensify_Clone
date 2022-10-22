export const getDateString = (date) => {
  let date_modified;

  if (date) date_modified = new Date(date).toLocaleDateString();
  else date_modified = new Date().toLocaleDateString();

  date_modified = date_modified.split("/").reverse().join("-");
  if (date_modified.lastIndexOf("-") === date_modified.length - 2) {
    date_modified =
      date_modified.slice(0, date_modified.lastIndexOf("-") + 1) +
      "0" +
      date_modified.charAt(date_modified.length - 1);
  }
  let dateArray = date_modified.split("-");
  let temp = dateArray[1];
  dateArray[1] = dateArray[2];
  dateArray[2] = temp;
  date_modified = dateArray.join("-");
  return date_modified;
};

export const isSearchFilterActive = (searchFilters) => {
  if (
    searchFilters.from_date !== null ||
    searchFilters.to_date !== null ||
    searchFilters.merchant.trim().length !== 0 ||
    searchFilters.category.trim().length !== 0 ||
    searchFilters.expense_type.trim().length !== 0 ||
    searchFilters.report_type.length !== 0 ||
    searchFilters.sort_by.trim().length !== 0
  )
    return true;
  return false;
};

export const initialFilters = {
  from_date: null,
  to_date: null,
  merchant: "",
  category: "",
  expense_type: "",
  report_type: [],
  sort_by: "",
};
//change the token key accordingly
export const authToken = JSON.parse(
  window.localStorage.getItem("userGoogleProfile")
);

export const SERVER = "http://localhost:9000";

export const doc_ids = {
  user_id: "62685aaea6c5abe1e4e0bc2a",
  expense_id: "62685ad6a6c5abe1e4e0bc2d",
  report_id: "62685b18a6c5abe1e4e0bc38",
};

export const categories = [
  "Car",
  "Equipment",
  "Fees",
  "Office",
  "Insurance",
  "Interest",
  "Labor",
  "Maintainance",
  "Materials",
  "Entertainment",
  "Rent",
  "Taxes",
  "Travel",
  "Utilities",
];
