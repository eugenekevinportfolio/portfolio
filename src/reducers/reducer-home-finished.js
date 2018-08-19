const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "FINISH_HOME":
      return true;
    case "SKIP_ALL_INTROS":
      return true;
  }
  return state;
};
