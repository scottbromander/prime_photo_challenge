import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPendingSubmissions() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/submissions/pending', config);
    console.log(response.data);
    // yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.error(`Submission approved get request failed ${error}`);
  }
}

function* submissionSaga() {
  yield takeLatest('FETCH_PENDING_SUBMISSIONS', fetchPendingSubmissions);
}

export default submissionSaga;
