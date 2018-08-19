const initialState = "intro-1";

export default (state = initialState, action) => {
  switch (action.type) {
    case "FOCUS_INTRO":
      return action.id;
  }
  return state;
};
