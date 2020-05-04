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

const allApprovedSubmissionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_APPROVED_SUBMISSIONS':
      return action.payload;
    case 'CLEAR_ALL_APPROVED_SUBMISSIONS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export { submissionReducer, allApprovedSubmissionReducer };
