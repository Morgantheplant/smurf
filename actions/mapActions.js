import fetch from "isomorphic-fetch";
import * as constants from "../constants/index";

const requestLocations = function requestLocations() {
  return {
    type: constants.REQUEST_LOCATIONS
  };
};

const receiveLocations = function receiveLocations(locations) {
  return {
    type: constants.RECEIVE_LOCATIONS,
    locations
  };
};

const requestReport = function requestReport() {
  return {
    type: constants.REQUEST_REPORT
  };
};

const receiveReport = function receiveReport(currentReport) {
  return {
    type: constants.RECEIVE_REPORT,
    currentReport
  };
};

export const clearReport = function clearReport() {
  return {
    type: constants.CLEAR_REPORT
  };
};

export function getLocations() {
  return dispatch => {
    const url = "/locations";
    const options = { method: "GET" };
    dispatch(requestLocations());
    return fetch(url, options)
            .then(response => response.json())
            .then(json => dispatch(receiveLocations(json.locations)));
  };
}

export function getReport(params) {
  return dispatch => {
    const url = `/report/${params.id}`;
    const options = { method: "GET" };
    dispatch(requestReport());
    return fetch(url, options)
            .then(response => response.json())
            .then(json => dispatch(receiveReport(json.report)));
  };
}
