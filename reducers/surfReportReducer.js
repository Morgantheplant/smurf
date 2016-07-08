let initialState = {
  indexHovered:0
}

export const surfReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_HOVER_DAY':
      return {
        indexHovered: action.indexHovered
      }
    case 'OFF_HOVER_DAY':
      return {
        indexHovered: action.indexHovered
      }  
    default: 
      return state;
  }
}

