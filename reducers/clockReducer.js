const initialState = {
  time: Date.now()
};

export const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        time: action.time,
      }
    default: 
      return state;
  }
}

