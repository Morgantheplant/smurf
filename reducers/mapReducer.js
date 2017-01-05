import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_REPORT,
  RECEIVE_REPORT,
  CLEAR_REPORT,
  CHANGE_FORECAST_DAY
  } from "../constants/index";

const initialState = {
  locations: [],
  currentReport: null,
  isFetching: false,
  forecastDay: 1
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
    case CHANGE_FORECAST_DAY:
      return Object.assign({}, state, {
        forecastDay: action.day
      })  
    default:
      return state;
    }
};

