const initialState = "moment-1";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_MOMENT":
      return action.id
  }
  return state;
};
