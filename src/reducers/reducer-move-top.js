const initialState = {
  previousTop: 300
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_TOP":
      return {
        previousTop: state.previousTop - action.moveTopValue
      }
  }
  return state;
};
