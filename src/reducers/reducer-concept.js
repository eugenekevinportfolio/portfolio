const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_CONCEPT":
      return action.payload
  }
  return state;
};
