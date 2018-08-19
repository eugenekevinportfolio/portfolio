const initialState = "home";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TAB":
      return action.tab
  }
  return state;
};
