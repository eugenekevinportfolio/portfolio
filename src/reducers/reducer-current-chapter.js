const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CHAPTER":
      return action.id
  }
  return state;
};
