import { RECEIVE_BREAKS, TOGGLE_MENU, CLICK_MENU_ITEM, CLOSE_REPORT } from "../constants/index";


function receiveReportDetail(id){
  return {
    type: RECEIVE_REPORT_DETAIL
  };
}

function receiveBreaks(data){
  return {
    type: RECEIVE_BREAKS,
    data
  }
}

export function toggleMenu(){
  return {
    type: TOGGLE_MENU
  }
}

export function clickMenuItem(id){
  return {
    type: CLICK_MENU_ITEM,
    id
  }
}

export function closeReport(){
  return {
    type: CLOSE_REPORT
  }
}

export function getReportDetail(id){
  return dispatch => {
    // const url = `/locations/breaks/${id}`;
    // const options = { method: "GET" };
    // return fetch(url, options)
    //         .then((response) => {
    //           return response.json()})
    //         .then(json => dispatch(receiveBreaks(json.breaks)));
  };
}

export function getBreaks(id) {
  return dispatch => {
    const url = `/locations/breaks/${id}`;
    const options = { method: "GET" };
    return fetch(url, options)
            .then((response) => {
              return response.json()})
            .then(json => dispatch(receiveBreaks(json.breaks)));
  };
}