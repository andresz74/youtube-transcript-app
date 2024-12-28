import {
  FETCH_TRANSCRIPT_SUCCESS,
  FETCH_TRANSCRIPT_FAILURE,
  RESET_TRANSCRIPT,
} from "./actions";

const initialState = {
  transcriptData: null,
  error: null,
  lastFetchedUrl: null,
};

export const transcriptReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TRANSCRIPT_SUCCESS:
      return {
        ...state,
        transcriptData: action.payload,
        error: null,
        lastFetchedUrl: action.meta?.url,
      };
    case FETCH_TRANSCRIPT_FAILURE:
      return {
        ...state,
        transcriptData: null,
        error: action.payload,
        lastFetchedUrl: null,
      };
    case RESET_TRANSCRIPT:
      return {
        ...state,
        transcriptData: null,
        error: null,
        lastFetchedUrl: null,
      };
    default:
      return state;
  }
};
