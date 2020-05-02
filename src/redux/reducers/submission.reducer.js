const submissionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return action.payload;
    case 'CLEAR_SUBMISSIONS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default submissionReducer;
