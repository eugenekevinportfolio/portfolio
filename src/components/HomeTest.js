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

  handleScroll() {
    const { window_dimensions, intros } = this.props;
    const page_center = window_dimensions.height/2 + 50;
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
    this.props.introFocus(id_to_focus);
  }

  scrollStyle() {
    const { intros, intro_focus } = this.props;
    const intros_keys = Object.keys(intros);

    if (intro_focus === intros_keys[intros_keys.length - 1]) {
      return {
        transform: "scale(0.8)",
        opacity: 0,
        pointerEvents: "none",
        cursor: "default"
      }
    }
  }

  render() {
    const { home_finished, dark_mode } = this.props;
    const down_arrow = dark_mode ? light_down_arrow : dark_down_arrow;

    return (
      <div
        onScroll={() => this.handleScroll()}
        className="home">
        {this.renderIntro()}
        <div
          onClick={() => {
            const last_intro = document.getElementById("last-intro");
            last_intro.scrollIntoView({
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
