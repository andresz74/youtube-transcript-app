import { FETCH_TRANSCRIPT_SUCCESS, FETCH_TRANSCRIPT_FAILURE } from './actions';

const initialState = {
  transcriptData: null,
  error: null
};

export const transcriptReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TRANSCRIPT_SUCCESS:
      return { ...state, transcriptData: action.payload, error: null };
    case FETCH_TRANSCRIPT_FAILURE:
      return { ...state, transcriptData: null, error: action.payload };
    default:
      return state;
  }
};
