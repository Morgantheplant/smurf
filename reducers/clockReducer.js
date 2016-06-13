const initialState = {
  time: 0
};

// Reducer function
export const timerStore = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        time: action.time,
      };

    default: 
      return state;
  }
}

// Create store using the reducer
const store = createStore(timer);