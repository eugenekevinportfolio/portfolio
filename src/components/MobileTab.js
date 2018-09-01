import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index.js';
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
    const { text, id, dark_mode } = this.props;
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
            this.props.selectTab(id)
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
    selectTab
  }, dispatch)
}

const selector = createSelector(
  state => state['current_tab'],
  state => state['dark_mode'],
  state => state['menu_tabs'],
  (
    current_tab,
    dark_mode,
    menu_tabs
) => {
    return  {
      current_tab,
      dark_mode,
      menu_tabs
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileTab);
