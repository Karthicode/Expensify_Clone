
export const loginSuccess = (state, action) => {
  localStorage.setItem('userProfileGoogle',JSON.stringify({token: action?.data}));
  state.isLoggedin=true;
  return{ ...state, authData:action?.data, isLoggedin:action.isLoggedin};
}

// export const loginFailure = (state, action) => {
  
// };
export const logout = (state, action) => {
  localStorage.clear();
  state.isLoggedin = false;
  return { ...state , authData:null};
};


