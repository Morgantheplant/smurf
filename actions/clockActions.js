import * as constants from '../constants/index';


export const clockTick = function clockTick(){
  return {
    type: constants.TICK,
      time: Date.now()
  };
}