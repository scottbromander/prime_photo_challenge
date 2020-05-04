import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLeaderboard() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get(
      '/api/submissions/team/leaderboard',
      config
    );
    yield put({ type: 'SET_LEADERBOARD', payload: response.data });
  } catch (error) {
    console.error(`Leaderboard get request failed ${error}`);
  }
}
function* leaderboardSaga() {
  yield takeLatest('FETCH_LEADERBOARD', fetchLeaderboard);
}

export default leaderboardSaga;
