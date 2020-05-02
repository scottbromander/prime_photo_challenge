import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postPhoto(action) {
  try {
    yield axios.post('api/photo', action.payload);
    yield put({ type: 'GET_PHOTO' });
  } catch (error) {
    console.error('User get request failed', error);
  }
}

function* getPhotos() {
  try {
    const response = yield axios.get('/api/photo');

    yield put({ type: 'SET_TEAM_CHALLENGES', payload: response.data });
  } catch (error) {
    console.error('Challenges get request failed', error);
  }
}

function* imageSaga() {
  yield takeLatest('POST_PHOTO', postPhoto);
  yield takeLatest('GET_PHOTO', getPhotos);
}

export default imageSaga;
