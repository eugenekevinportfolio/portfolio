export const selectTab = (tab) => {
  return(
    {
      type: "SELECT_TAB",
      tab
    }
  );
}

export const activateDarkMode = (payload) => {
  return(
    {
      type: "ACTIVATE_DARK_MODE",
      payload
    }
  );
}

export const openBottom = (payload) => {
  return(
    {
      type: "OPEN_BOTTOM",
      payload
    }
  );
}

export const transparentArticle = (payload) => {
  return(
    {
      type: "TRANSPARENT_ARTICLE",
      payload
    }
  );
}

export const moveSelector = (position) => {
  return(
    {
      type: "MOVE_SELECTOR",
      position
    }
  );
}

export const storePosition = (id, position) => {
  return(
    {
      type: "STORE_POSITION",
      id,
      position
    }
  );
}

export const hideNavbar = (payload) => {
  return(
    {
      type: "HIDE_NAVBAR",
      payload
    }
  );
}

export const openConcept = (payload) => {
  return(
    {
      type: "OPEN_CONCEPT",
      payload
    }
  );
}

export const openBurger = (payload) => {
  return(
    {
      type: "OPEN_BURGER",
      payload
    }
  );
}

export const moveCoversToLeft = () => {
  return(
    {
      type: "MOVE_LEFT",
    }
  );
}

export const moveCoversToRight = () => {
  return(
    {
      type: "MOVE_RIGHT",
    }
  );
}

export const enterCarousel = (payload) => {
  return(
    {
      type: "ENTER_CAROUSEL",
      payload
    }
  );
}

export const autoPlay = (payload) => {
  return(
    {
      type: "AUTOPLAY",
      payload
    }
  );
}

export const storeMomentsTop = (moments_top) => {
  return(
    {
      type: "STORE_MOMENTS_TOP",
      moments_top
    }
  );
}

export const moveMoments = (moments_move, isDesktop) => {
  return(
    {
      type: "MOVE_MOMENTS",
      moments_move,
      isDesktop
    }
  );
}

export const moveTimers = (timers_move) => {
  return(
    {
      type: "MOVE_TIMERS",
      timers_move
    }
  );
}

export const storePicturesLeft = (pictures_left) => {
  return(
    {
      type: "STORE_PICTURES_LEFT",
      pictures_left
    }
  );
}

export const movePictures = (pictures_move) => {
  return(
    {
      type: "MOVE_PICTURES",
      pictures_move
    }
  );
}

export const selectMoment = (id) => {
  return(
    {
      type: "SELECT_MOMENT",
      id
    }
  );
}

export const fullScreenImage = (src, payload) => {
  return(
    {
      type: "FULL_SCREEN_IMAGE",
      src,
      payload
    }
  );
}

export const selectPicture = (id) => {
  return(
    {
      type: "SELECT_PICTURE",
      id
    }
  );
}

export const selectChapter = (id) => {
  return(
    {
      type: "SELECT_CHAPTER",
      id
    }
  );
}

export const updateCentralPosition = (id, central_position) => {
  return(
    {
      type: "UPDATE_CENTRAL_POSITION",
      id,
      central_position
    }
  );
}

export const skipAllIntros = () => {
  return(
    {
      type: "SKIP_ALL_INTROS",
    }
  );
}

export const finishHome = () => {
  return(
    {
      type: "FINISH_HOME",
    }
  );
}

export const moveTop = (moveTopValue) => {
  return(
    {
      type: "MOVE_TOP",
      moveTopValue
    }
  );
}

export const introFocus = (id) => {
  return(
    {
      type: "FOCUS_INTRO",
      id
    }
  );
}

export const storeWindowDimensions = (width, height) => {
  return(
    {
      type: "STORE_WINDOW_DIMENSIONS",
      width,
      height
    }
  );
}

export const switchToMobile = () => {
  return(
    {
      type: "SWITCH_TO_MOBILE",
    }
  );
};

export const switchToDesktop = () => {
  return(
    {
      type: "SWITCH_TO_DESKTOP",
    }
  );
};
