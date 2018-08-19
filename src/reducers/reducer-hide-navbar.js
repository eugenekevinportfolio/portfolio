const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "HIDE_NAVBAR":
      return action.payload
  }
  return state;
};
