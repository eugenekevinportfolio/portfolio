const initialState = {
  mogi: {
    order: 0,
    ready: true,
    title: "iOS Mogi",
    description: "Non-intrusive Siri with contextual awareness, new accessibility features, a clipboard manager, contextual awareness in Apple Maps, Live Notifications, and much more. iOS Mogi is all about mobile multitasking and context preservation.",
    date: "July 2018",
    medium: "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b",
    reddit: "https://www.reddit.com/r/apple/comments/947yrm/redesigning_siri_and_adding_multitasking_features/?utm_content=comments&utm_medium=user&utm_source=reddit&utm_name=frontpage"
  },
  newton: {
    order: 1,
    ready: false,
    title: "macOS Newton",
    description: "New window management for the desktop, inspired by the mobile. macOS Newton brings the mobile and the desktop closer than ever.",
    date: "July 2018",
    medium: "https://uxdesign.cc/my-attempt-at-redesigning-the-desktop-experience-macos-case-study-99f5f2fb3b10",
  },
  youtube: {
    order: 2,
    ready: false,
    title: "Youtube 2.0",
    description: "A better homepage with a big emphasis on recommendations, picture-in-picture for the desktop, Instant Playlists, clear labelling in the video panel, digital wellbeing and much more. Youtube 2.0 vows to deliver a modern and intuitive experience to all its users.",
    date: "June 2018",
    medium: "https://uxdesign.cc/my-attempt-at-redesigning-youtube-for-a-more-intuitive-and-modern-experience-dbd7707c135c",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_LEFT":
      const new_state_left = {};
      for (let key in state) {
        new_state_left[key] = {
          ...state[key],
          order: state[key].order - 1,
        }
      }
      return new_state_left;
    case "MOVE_RIGHT":
      const new_state_right = {};
      for (let key in state) {
        new_state_right[key] = {
          ...state[key],
          order: state[key].order + 1,
        }
      }
      return new_state_right;
  }
  return state;
};
