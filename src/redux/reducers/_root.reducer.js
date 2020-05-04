import { combineReducers } from 'redux';
import errors from './errors.reducer';
import loginMode from './loginMode.reducer';
import user from './user.reducer';
import { challengesReducer, teamChallengesReducer } from './challenges.reducer';
import {
  submissionReducer,
  allApprovedSubmissionReducer,
} from './submission.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  challengesReducer,
  teamChallengesReducer,
  submissionReducer,
  allApprovedSubmissionReducer,
});

export default rootReducer;
