const initialDesktopState = {
  moments_top: 130,
  moments_move: 20,
};

const initialMobileState = {
  moments_top: 90,
  moments_move: 20,
};

export default (state = initialDesktopState, action) => {
  switch (action.type) {
    case "STORE_MOMENTS_TOP":
      return {
        ...state,
        moments_top: action.moments_top
      }
    case "MOVE_MOMENTS":
     return {
       ...state,
       moments_move: action.moments_move + state.moments_move
     }
    case "SWITCH_TO_MOBILE":
     return initialMobileState;
    case "SWITCH_TO_DESKTOP":
     return initialDesktopState;
  }
  return state;
};
