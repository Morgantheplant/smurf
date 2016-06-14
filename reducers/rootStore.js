import { createStore, combineReducers } from '../node_modules/redux'
import { clockReducer } from './clockReducer'
// Create store using the reducer
const store = createStore(clockReducer);

// add more reducers here alter
// let mainStore = combineReducers({
//   clockReducer: clockReducer
// });


export default store;