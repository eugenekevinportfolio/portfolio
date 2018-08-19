const initialState = {
  isFullScreen: false,
  src: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FULL_SCREEN_IMAGE":
      if (action.payload) {
        return {
          isFullScreen: action.payload,
          src: action.src
        }
      }
      else {
        return {
          ...state,
          isFullScreen: action.payload,
        }
      }
  }
  return state;
};
