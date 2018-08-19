const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case "TRANSPARENT_ARTICLE":
      return action.payload
  }
  return state;
};
