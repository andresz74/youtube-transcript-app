import {
  FETCH_TRANSCRIPT_SUCCESS,
  FETCH_TRANSCRIPT_FAILURE,
  RESET_TRANSCRIPT,
  FETCHING_TRANSCRIPT,
} from "./actions";

const initialState = {
  loading: false,
  transcriptData: null,
  error: null,
  lastFetchedUrl: null,
};

export const transcriptReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TRANSCRIPT_SUCCESS:
      return {
        ...state,
        loading: false,
        transcriptData: action.payload,
        error: null,
        lastFetchedUrl: action.meta?.url,
      };
    case FETCH_TRANSCRIPT_FAILURE:
      return {
        ...state,
        loading: false,
        transcriptData: null,
        error: action.payload,
        lastFetchedUrl: null,
      };
    case RESET_TRANSCRIPT:
      return {
        ...state,
        loading: false,
        transcriptData: null,
        error: null,
        lastFetchedUrl: null,
      };
    case FETCHING_TRANSCRIPT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
