import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { clockReducer } from './clockReducer'
import { surfReportReducer } from './surfReportReducer'
import { mapReducer } from './mapReducer';

let mainStore = combineReducers({
  clockReducer,
  surfReportReducer,
  mapReducer
});


const store = createStore(
  mainStore,
  applyMiddleware(thunk)
);

export default store;