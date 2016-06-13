import { combineReducers, createStore } from 'redux'
import { clockReducer } from './clockReducer'

let mainStore = combineReducers({
  clockReducer
  //will add more reducers here
});

export default rootStore