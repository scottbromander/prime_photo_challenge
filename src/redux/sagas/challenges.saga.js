//POST_IMAGE

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* getChallenges() {
  try {
    const response = yield axios.get('/api/challenges');

    yield put({ type: 'SET_CHALLENGES', payload: response.data });
  } catch (error) {
    console.log('Challenges get request failed', error);
  }
}

function* imageSaga() {
  yield takeLatest('GET_CHALLENGES', getChallenges);
}

export default imageSaga;
