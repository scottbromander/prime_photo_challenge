//POST_IMAGE

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postPhoto(action) {
  try {
    const response = yield axios.post('api/photo', action.payload);

    console.log(response);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'GET_PHOTO' });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getPhotos() {
  try {
    const response = yield axios.get('/api/photo');
    console.log(response.data);

    yield put({ type: 'SET_TEAM_CHALLENGES', payload: response.data });
  } catch (error) {
    console.log('Challenges get request failed', error);
  }
}

function* imageSaga() {
  yield takeLatest('POST_PHOTO', postPhoto);
  yield takeLatest('GET_PHOTO', getPhotos);
}

export default imageSaga;
