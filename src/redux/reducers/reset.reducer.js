const resetReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_RESET':
      return true;
    case 'CLEAR_RESET':
      return false;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export { resetReducer };
