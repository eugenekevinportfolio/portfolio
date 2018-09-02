import { combineReducers } from 'redux';
import menu_tabs from './reducer-menu-tabs.js';
import current_tab from './reducer-current-tab.js';
import intros from './reducer-intro.js';
import move from './reducer-move-top.js';
import intro_focus from './reducer-intro-focus.js';
import window from './reducer-window.js';
import dark_mode from './reducer-dark-mode.js';
import home_finished from './reducer-home-finished.js';
import moments from './reducer-moments.js';
import selected_moment from './reducer-selected-moment.js';
import moments_scroll from './reducer-moments-scroll.js';
import carousel from './reducer-carousel.js';
import selected_picture from './reducer-selected-picture.js';
import pictures_scroll from './reducer-pictures-scroll.js';
import timers_scroll from './reducer-timers-scroll.js';
import full_sreen_image from './reducer-fullscreen.js';
import covers from './reducer-covers.js';
import burgerOpen from './reducer-burger.js';
import concept_open from './reducer-concept.js';
import navbar_hidden from './reducer-hide-navbar.js';
import current_chapter from './reducer-current-chapter.js';
import chapters from './reducer-chapters.js';
import selector_position from './reducer-selector.js';
import transparent_article from './reducer-transparent-article.js';
import bottom_open from './reducer-bottom-article.js';
import selected_cover from './reducer-selected-cover.js';

const allReducers = combineReducers({
  menu_tabs,
  current_tab,
  intros,
  move,
  intro_focus,
  window,
  dark_mode,
  home_finished,
  moments,
  selected_moment,
  moments_scroll,
  carousel,
  selected_picture,
  pictures_scroll,
  timers_scroll,
  full_sreen_image,
  covers,
  burgerOpen,
  concept_open,
  navbar_hidden,
  current_chapter,
  chapters,
  selector_position,
  transparent_article,
  bottom_open,
  selected_cover
});

export default allReducers;
