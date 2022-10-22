import React, { createContext, useContext, useReducer } from "react";

//prepares the data layer
export const StateContext = createContext();

//wraps the App component and provides the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useDataFromStore = () => useContext(StateContext);
