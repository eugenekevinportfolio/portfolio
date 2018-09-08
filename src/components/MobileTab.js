import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  selectTab,
  introFocus,
  openConcept,
  hideNavbar
} from '../actions/index.js';
import resume from '../img/Resume.pdf';
import dark_resume from '../img/DarkResume.pdf';

class MobileTab extends Component {
  mobileTabStyle() {
    const { id, current_tab, open, dark_mode, menu_tabs } = this.props;
    const menu_tabs_keys = Object.keys(menu_tabs);
    const index = menu_tabs_keys.indexOf(id);

    if (dark_mode) {
      if (open) {
        if (current_tab === id) {
          return {
            backgroundColor: "white",
            color: "black",
            opacity: 1,
            top: 0,
            transitionDelay: index * 0.08 + "s",
            transform: "scale(1)",
            // borderBottom: 'solid 1px rgba(255,255,255,0.2)'
          }
        }
        else {
          return {
            color: "white",
            opacity: 1,
            top: 0,
            transitionDelay: index * 0.08 + "s",
            transform: "scale(1)",
            // borderBottom: 'solid 1px rgba(255,255,255,0.2)'
          }
        }
      }
    }
    else {
      if (open) {
        if (current_tab === id) {
          return {
            backgroundColor: "black",
            color: "white",
            opacity: 1,
            top: 0,
            transitionDelay: index * 0.08 + "s",
            transform: "scale(1)"
          }
        }
        else {
          return {
            opacity: 1,
            top: 0,
            transitionDelay: index * 0.08 + "s",
            transform: "scale(1)"
          }
        }
      }
    }
  }

  render() {
    const { text, id, dark_mode, current_tab, concept_open, navbar_hidden, intros } = this.props;
    if (id === "resume") {
      return (
        <a
          href={dark_mode ? dark_resume : resume}
          target="_blank"
          style={this.mobileTabStyle()}
          className="mobile-tab">
          <p>
            {text.toUpperCase()}
          </p>
        </a>
      );
    }
    else {
      return (
        <div
          style={this.mobileTabStyle()}
          className="mobile-tab"
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
          <p>
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
  state => state['menu_tabs'],
  state => state['intros'],
  state => state['concept_open'],
  state => state['navbar_hidden'],
  (
    current_tab,
    dark_mode,
    menu_tabs,
    intros,
    concept_open,
    navbar_hidden
) => {
    return  {
      current_tab,
      dark_mode,
      menu_tabs,
      intros,
      concept_open,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileTab);
