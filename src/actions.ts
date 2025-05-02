export const FETCH_TRANSCRIPT = 'FETCH_TRANSCRIPT';
export const FETCH_TRANSCRIPT_SUCCESS = 'FETCH_TRANSCRIPT_SUCCESS';
export const FETCH_TRANSCRIPT_FAILURE = 'FETCH_TRANSCRIPT_FAILURE';
export const RESET_TRANSCRIPT = 'RESET_TRANSCRIPT';
export const FETCHING_TRANSCRIPT = 'FETCHING_TRANSCRIPT';

export const fetchTranscript = (url: string, isDetailed: boolean, lang?: string, ) => ({
  type: FETCH_TRANSCRIPT,
  payload: { url, isDetailed, lang }
});

export const fetchTranscriptSuccess = (data: any, url: any) => ({
  type: FETCH_TRANSCRIPT_SUCCESS,
  payload: data,
  meta: { url },
});

export const fetchTranscriptFailure = (error: string) => ({
  type: FETCH_TRANSCRIPT_FAILURE,
  payload: error
});

export const resetTranscript = () => ({
  type: RESET_TRANSCRIPT,
});

export const fetchingTranscript = () => ({
  type: FETCHING_TRANSCRIPT,
});
