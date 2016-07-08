import { createStore, combineReducers } from 'redux'
import { clockReducer } from './clockReducer'
import { surfReportReducer } from './surfReportReducer'
// Create store using the reducer

// add more reducers here alter
let mainStore = combineReducers({
  clockReducer,
  surfReportReducer
});
const store = createStore(mainStore)
//const store = createStore(clockReducer);

export default store;