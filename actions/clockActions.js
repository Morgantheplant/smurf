import * as constants from "../constants/index";


export const clockTick = function clockTick() {
  return {
    type: constants.TICK,
    time: Date.now()
  };
};

export const hoverDay = function hoverDay(index) {
  return {
    type: constants.ON_HOVER_DAY,
    indexHovered: index
  };
};
