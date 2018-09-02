import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  finishHome,
} from '../actions/index.js';

class IntroTest extends Component {
  componentDidUpdate(prevProps) {
    const { id, intro_focus, intros } = this.props;
    const intros_keys = Object.keys(intros);
    if (prevProps.intro_focus !== intro_focus) {
      if (intro_focus === intros_keys[intros_keys.length - 1] && id === intros_keys[intros_keys.length - 1]) {
        this.props.finishHome()
      }
    }
  }

  introStyle() {
    const { id, intro_focus, dark_mode, home_finished } = this.props;

    if (dark_mode) {
      if (home_finished) {
        if (id === intro_focus) {
          return {
            opacity: 1,
            color: "white"
          }
        }
        else {
          return {
            opacity: 0.1,
            color: "white"
          }
        }
      }
      else {
        if (id === intro_focus) {
          return {
            opacity: 1,
            color: "white"
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === 1) {
          return {
            opacity: 0.1,
            color: "white"
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === -1) {
          return {
            opacity: 0.02,
            color: "white"
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === 2) {
          return {
            opacity: 0.02,
            color: "white"
          }
        }
      }
    }
    else {
      if (home_finished) {
        if (id === intro_focus) {
          return {
            opacity: 1
          }
        }
        else {
          return {
            opacity: 0.1
          }
        }
      }
      else {
        if (id === intro_focus) {
          return {
            opacity: 1
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === 1) {
          return {
            opacity: 0.1
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === -1) {
          return {
            opacity: 0.04,
          }
        }
        else if (id.substring(6) - intro_focus.substring(6) === 2) {
          return {
            opacity: 0.02
          }
        }
      }
    }
  }

  introId() {
    const { intros, id } = this.props;
    const intros_keys = Object.keys(intros);

    if (id === intros_keys[0]) {
      return "first-intro"
    }
    else if (id === intros_keys[intros_keys.length - 1]) {
      return "last-intro"
    }
  }

  render() {
    const { text } = this.props;

    return (
      <p
        id={this.introId()}
        style={this.introStyle()}
        className="intro">
        {text}
      </p>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    finishHome
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['intros'],
  state => state['intro_focus'],
  state => state['home_finished'],
  (
    dark_mode,
    intros,
    intro_focus,
    home_finished
) => {
    return {
      dark_mode,
      intros,
      intro_focus,
      home_finished
    };
  }
);

export default connect(selector, matchDispatchToProps)(IntroTest);
