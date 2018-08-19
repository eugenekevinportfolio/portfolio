const initialState = {
  intro: {
    name: "Live Notifications",
    position: ""
  },
  siri: {
    name: "Non-intrusive Siri",
    position: ""
  },
  accessibility: {
    name: "Siri actions",
    position: ""
  },
  clipboard: {
    name: "Clipboard",
    position: ""
  },
  backstory: {
    name: "Backstory",
    position: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POSITION":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          position: action.position
        }
      }
  }
  return state;
};
