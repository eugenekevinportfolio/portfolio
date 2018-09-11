import React, { Component } from 'react';
import map from 'lodash/map';
import IntroTest from './IntroTest.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index.js';
import {
  introFocus
} from '../actions/index.js';
import dark_down_arrow from '../img/DownArrow.png';
import light_down_arrow from '../img/LightDownArrow.png';
import resume from '../img/Resume.pdf';
import dark_resume from '../img/DarkResume.pdf';

class HomeTest extends Component {
  renderIntro() {
    const { intros } = this.props;

    return(
      map(
        intros,
        (intro, id) => <IntroTest key={id} id={id} {...intro} />
      )
    )
  }

  componentDidMount() {
    // this.pressKey = this.pressKey.bind(this);
    // window.addEventListener("keydown", this.pressKey);
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener("keydown", this.pressKey);
    // this.pressKey = undefined;
    window.removeEventListener("scroll", this.handleScroll);
    this.handleScroll = undefined;
  }

  handleScroll() {
    const { window_dimensions, intros, intro_focus } = this.props;
    const page_center = window_dimensions.height/2 + 10;
    const intros_array = document.getElementsByClassName("intro");
    const intros_center = [];
    for (let i = 0; i < intros_array.length; i++) {
      intros_center[i] = (intros_array[i].getBoundingClientRect().top + intros_array[i].getBoundingClientRect().bottom)/2
    }
    const distance_to_center = [];
    for (let i = 0; i < intros_center.length; i++) {
      distance_to_center[i] = Math.abs(intros_center[i] - page_center);
    }
    const minimum_distance = Math.min(...distance_to_center);
    const index_of_min = distance_to_center.indexOf(minimum_distance);
    const id_to_focus = Object.keys(intros)[index_of_min];
    id_to_focus !== intro_focus && this.props.introFocus(id_to_focus);
  }

  scrollStyle() {
    const { intros, intro_focus, home_finished } = this.props;
    const intros_keys = Object.keys(intros);

    if (!home_finished) {
      if (intro_focus === intros_keys[intros_keys.length - 1]) {
        return {
          transform: "scale(0.8)",
          opacity: 0,
          pointerEvents: "none",
          cursor: "default"
        }
      }
    }
    else {
      if (intro_focus === intros_keys[intros_keys.length - 1]) {
        return {
          transform: "scale(0.8)",
          opacity: 0,
          pointerEvents: "none",
          cursor: "default",
        }
      }
    }
  }

  homeStyle() {
    const { dark_mode, window_dimensions } = this.props;

    if (dark_mode) {
      return {
        backgroundColor: "#262626",
        paddingBottom: (window_dimensions.height / 2) - 120
      }
    }
    else {
      return {
        paddingBottom: (window_dimensions.height / 2) - 120
      }
    }
  }

  render() {
    const { home_finished, dark_mode, intros, window_dimensions } = this.props;
    const down_arrow = dark_mode ? light_down_arrow : dark_down_arrow;
    const intros_keys = Object.keys(intros);
    const last_intro_key = intros_keys[intros_keys.length - 1];

    return (
      <div
        style={this.homeStyle()}
        id="home"
        className="home">
        {this.renderIntro()}
        {window_dimensions.isDesktop &&
          <p
            style={dark_mode ? {color: "white"} : {}}
            className="Left-name">
            Kevin Eugene
          </p>
        }
        <div
          onClick={() => {
            const last_intro_dom = document.getElementById("last-intro");
            // this.props.introFocus(last_intro_key);
            last_intro_dom.scrollIntoView({
              behavior: 'smooth'
            });
          }}
          style={this.scrollStyle()}
          className="scroll-bottom">
          <p style={dark_mode ? {color: "white"} : {}}>
            Scroll to the bottom
          </p>
          <img className="arrow" src={down_arrow}/>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    introFocus
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['intros'],
  state => state['intro_focus'],
  state => state['window'],
  state => state['home_finished'],
  (
    dark_mode,
    intros,
    intro_focus,
    window_dimensions,
    home_finished
) => {
    return {
      dark_mode,
      intros,
      intro_focus,
      window_dimensions,
      home_finished
    };
  }
);

export default connect(selector, matchDispatchToProps)(HomeTest);
