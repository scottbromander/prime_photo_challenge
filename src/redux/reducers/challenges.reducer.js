const challengesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHALLENGES':
      return action.payload;
    case 'CLEAR_CHALLENGES':
      return [];
    default:
      return state;
  }
};

const teamChallengesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_CHALLENGES':
      return action.payload;
    case 'CLEAR_TEAM_CHALLENGES':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export { challengesReducer, teamChallengesReducer };
