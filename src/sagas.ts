import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { FETCH_TRANSCRIPT, fetchTranscriptSuccess, fetchTranscriptFailure } from './actions';
import config from './config';

interface TranscriptResponse {
  // TODO: Define the structure of the response we're expecting here
  transcriptData: any;
}

function* fetchTranscriptSaga(action: any): Generator<any, void, AxiosResponse<TranscriptResponse>> {
  const { url, isDetailed } = action.payload;
  const endpoint = isDetailed ? '/transcript' : '/simple-transcript';
  try {
    const response: AxiosResponse<TranscriptResponse> = yield call(axios.post, `${config.apiBaseUrl}${endpoint}`, { url });
    yield put(fetchTranscriptSuccess(response.data, url));
  } catch (error) {
    yield put(fetchTranscriptFailure('Error fetching transcript'));
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_TRANSCRIPT, fetchTranscriptSaga);
}
