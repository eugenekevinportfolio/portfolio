const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVATE_DARK_MODE":
      return action.payload
  }
  return state;
};
