const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PICTURE":
      return action.id
  }
  return state;
};
