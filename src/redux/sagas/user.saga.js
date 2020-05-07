import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('api/user', config);

    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.error(`User get request failed: ${error}`);
  }
}

function* resetPassword(action) {
  try {
    yield axios.put('api/user/reset/password', action.payload);
    yield put({ type: 'SET_RESET' });
  } catch (error) {
    console.error(`User get request failed: ${error}`);
  }
}

function* forgotPassword(action) {
  try {
    const response = yield axios.post('api/user/forgot', action.payload);
  } catch (error) {
    console.error(`Post forgot failed: ${error}`);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('RESET_PASSWORD', resetPassword);
  yield takeLatest('FORGOT_PASSWORD', forgotPassword);
}

export default userSaga;
