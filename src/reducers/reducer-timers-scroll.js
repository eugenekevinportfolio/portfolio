const initialState = {
  timers_left: 110,
  timers_move: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_TIMERS_LEFT":
      return {
        ...state,
        timers_left: action.timers_left
      }
    case "MOVE_TIMERS":
      return {
        ...state,
        timers_move: action.timers_move + state.timers_move
      }
    case "ENTER_CAROUSEL":
      if (!action.payload) {
        return {
          ...state,
          timers_move: 0
        }
      }
  }
  return state;
};
