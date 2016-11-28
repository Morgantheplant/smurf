import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_REPORT,
  RECEIVE_REPORT,
  CLEAR_REPORT } from "../constants/index";

const initialState = {
  locations: [],
  currentReport: null
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_LOCATIONS:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_LOCATIONS:
    return Object.assign({}, state, {
      isFetching: false,
      locations: action.locations
    });
  case REQUEST_REPORT:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_REPORT:
    return Object.assign({}, state, {
      isFetching: false,
      currentReport: action.currentReport
    });
  case CLEAR_REPORT:
    return Object.assign({}, state, {
      currentReport: null
    });
  default:
    return state;
  }
};

