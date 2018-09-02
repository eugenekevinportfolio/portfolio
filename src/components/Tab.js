import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index.js';
import resume from '../img/Resume.pdf';
import dark_resume from '../img/DarkResume.pdf';
import { introFocus } from '../actions/index.js';

class Tab extends Component {
  selectorStyle() {
    const { id, current_tab, dark_mode, home_finished } = this.props;
    if (dark_mode) {
      if (home_finished) {
        if (current_tab === id) {
          return {
            backgroundColor: "white",
            color: "black"
          }
        }
      }
      else {
        return {
          opacity: 0,
          pointerEvents: "none"
        }
      }
    }
    else {
      if (home_finished) {
        if (current_tab === id) {
          return {
            backgroundColor: "black",
            color: "white"
          }
        }
      }
      else {
        return {
          opacity: 0,
          pointerEvents: "none"
        }
      }
    }
  }

  render() {
    const { text, id, dark_mode, current_tab, intros } = this.props;
    if (id === "resume") {
      return (
        <a
          href={dark_mode ? dark_resume : resume}
          target="_blank"
          style={this.selectorStyle()}
          className="tab">
          <p style={(dark_mode && id !== current_tab) ? {
            color: "white"
          } : {}}>
          {text.toUpperCase()}
          </p>
        </a>
      );
    }
    else {
      return (
        <div
          style={this.selectorStyle()}
          className="tab"
          onClick={() => {
            this.props.selectTab(id)
            if (id === "home" && current_tab === "home") {
              const first_intro_dom = document.getElementById("first-intro");
              this.props.introFocus(Object.keys(intros)[0]);
              first_intro_dom.scrollIntoView({
                'behavior': "smooth"
              });
            }
            else if (id === "home" && current_tab !== "home") {
              this.props.introFocus(Object.keys(intros)[0]);
            }
          }}>
          <p style={(dark_mode && id !== current_tab) ? {
            color: "white"
          } : {}}>
          {text.toUpperCase()}
          </p>
        </div>
      );
    }
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab,
    introFocus
  }, dispatch)
}

const selector = createSelector(
  state => state['current_tab'],
  state => state['dark_mode'],
  state => state['home_finished'],
  state => state['intros'],
  (
    current_tab,
    dark_mode,
    home_finished,
    intros
) => {
    return  {
      current_tab,
      dark_mode,
      home_finished,
      intros
    };
  }
);

export default connect(selector, matchDispatchToProps)(Tab);
