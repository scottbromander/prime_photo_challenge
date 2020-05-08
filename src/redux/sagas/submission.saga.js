import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPendingSubmissions() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/submissions/pending', config);
    yield put({ type: 'SET_SUBMISSIONS', payload: response.data });
  } catch (error) {
    console.error(`Submission approved get request failed ${error}`);
  }
}

function* fetchAllApprovedSubmissions() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/submissions/approved/all', config);
    yield put({ type: 'SET_ALL_APPROVED_SUBMISSIONS', payload: response.data });
  } catch (error) {
    console.error(`Submission approved get request failed ${error}`);
  }
}

function* approveSubmission(action) {
  try {
    yield axios.put(
      `api/submissions/approve/${action.payload.id}`,
      action.payload
    );

    yield put({ type: 'FETCH_PENDING_SUBMISSIONS' });
  } catch (error) {
    console.error(`Error with user registration: ${error}`);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* declineSubmission(action) {
  try {
    yield axios.put(
      `api/submissions/decline/${action.payload.id}`,
      action.payload
    );

    yield put({ type: 'FETCH_PENDING_SUBMISSIONS' });
  } catch (error) {
    console.error(`Error with user registration: ${error}`);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* submissionSaga() {
  yield takeLatest('FETCH_PENDING_SUBMISSIONS', fetchPendingSubmissions);
  yield takeLatest(
    'FETCH_ALL_APPROVED_SUBMISSIONS',
    fetchAllApprovedSubmissions
  );
  yield takeLatest('APPROVE_SUBMISSION', approveSubmission);
  yield takeLatest('DECLINE_SUBMISSION', declineSubmission);
}

export default submissionSaga;
