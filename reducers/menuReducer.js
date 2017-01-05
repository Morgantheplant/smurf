import { RECEIVE_BREAKS, TOGGLE_MENU, CLOSE_REPORT, CLICK_MENU_ITEM } from "../constants/index";

const initialState = {
  breaks: [],
  isOpen: false,
  locationCode: null
}
export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BREAKS:
      return Object.assign({}, state, {
        breaks: action.data
      });
    case TOGGLE_MENU: 
      return Object.assign({}, state, {
        isOpen: !state.isOpen
      });  
    case CLICK_MENU_ITEM:
      return Object.assign({}, state, {
        locationCode: action.id
      });
    case CLOSE_REPORT: 
        return Object.assign({}, state, {
          locationCode: null
        })
    default:
      return state;
    }
};

