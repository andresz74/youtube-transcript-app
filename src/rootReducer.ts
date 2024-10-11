import { combineReducers } from 'redux';
import { transcriptReducer } from './reducers';

export const rootReducer = combineReducers({
  transcript: transcriptReducer
});
