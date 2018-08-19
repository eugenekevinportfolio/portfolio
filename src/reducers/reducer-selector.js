const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_SELECTOR":
      return action.position
  }
  return state;
};
