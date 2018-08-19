const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_BURGER":
      return action.payload
  }
  return state;
};
