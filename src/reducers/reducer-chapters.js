const initialState = {
  mogi: {
    intro1: {
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
  },
  chatroom: {
    intro2: {
      name: "Introducing Chatroom",
      position: ""
    },
    scope: {
      name: "Expanding the scope",
      position: ""
    },
    groups: {
      name: "Group conversation",
      position: ""
    },
    conference: {
      name: "Video conference",
      position: ""
    },
    shell: {
      name: "Breaking the shell",
      position: ""
    },
    design: {
      name: "The design process",
      position: ""
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POSITION":
      return {
        ...state,
        [action.cover]: {
          ...state[action.cover],
          [action.id]: {
            ...state[action.cover][action.id],
            position: action.position
          }
        }
      }
  }
  return state;
};
