const initialState = {
  pictures_left: 110,
  pictures_move: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_PICTURES_LEFT":
      return {
        ...state,
        pictures_left: action.pictures_left
      }
    case "MOVE_PICTURES":
      return {
        ...state,
        pictures_move: action.pictures_move + state.pictures_move
      }
    case "ENTER_CAROUSEL":
      if (!action.payload) {
        return {
          ...state,
          pictures_move: 0
        }
      }
  }
  return state;
};
