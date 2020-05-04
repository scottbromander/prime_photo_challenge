const leaderboardReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEADERBOARD':
      return action.payload;
    case 'CLEAR_LEADERBOARD':
      return [];
    default:
      return state;
  }
};

export { leaderboardReducer };
