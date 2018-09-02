const initialState = "mogi";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_COVER":
      return action.id
  }
  return state;
};
