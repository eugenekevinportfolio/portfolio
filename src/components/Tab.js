import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import resume from '../img/Resume.pdf';
import dark_resume from '../img/DarkResume.pdf';
import {
  introFocus,
  openConcept,
  hideNavbar,
  selectTab
} from '../actions/index.js';

class Tab extends Component {
  selectorStyle() {
    const { id, current_tab, dark_mode } = this.props;
    if (dark_mode) {
      if (current_tab === id) {
        return {
          backgroundColor: "white",
          color: "black"
        }
      }
    }
    else {
      if (current_tab === id) {
        return {
          backgroundColor: "black",
          color: "white"
        }
      }
    }
  }

  render() {
    const { text, id, dark_mode, current_tab, intros, concept_open, navbar_hidden } = this.props;
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
            this.props.selectTab(id);
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
            else if (id === "concepts" && concept_open) {
              this.props.openConcept(false);
              navbar_hidden && this.props.hideNavbar(false);
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
    introFocus,
    openConcept,
    hideNavbar
  }, dispatch)
}

const selector = createSelector(
  state => state['current_tab'],
  state => state['dark_mode'],
  state => state['home_finished'],
  state => state['intros'],
  state => state['concept_open'],
  state => state['navbar_hidden'],
  (
    current_tab,
    dark_mode,
    home_finished,
    intros,
    concept_open,
    navbar_hidden
) => {
    return  {
      current_tab,
      dark_mode,
      home_finished,
      intros,
      concept_open,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(Tab);
