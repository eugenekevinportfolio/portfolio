const initialState = {
  width: "",
  height: "",
  isMobile: false,
  isDesktop: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_WINDOW_DIMENSIONS":
      return {
        ...state,
        width: action.width,
        height: action.height
      }
    case 'SWITCH_TO_MOBILE':
      return {
        ...state,
        isDesktop: false,
        isMobile: true
      };
    case 'SWITCH_TO_DESKTOP':
      return {
        ...state,
        isMobile: false,
        isDesktop: true
      };
  }
  return state;
};
