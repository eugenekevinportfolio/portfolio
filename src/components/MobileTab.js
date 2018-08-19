import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index.js';

class MobileTab extends Component {
  mobileTabStyle() {
    const { id, current_tab, open, dark_mode } = this.props;
    const menuArray = ["home", "playground", "concepts", "blog"];
    const index = menuArray.indexOf(id);

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
    const { text, id } = this.props;
    return (
      <div
        style={this.mobileTabStyle()}
        className="mobile-tab"
        onClick={() => {
          this.props.selectTab(id)
        }}
      >
          <p>
            {text.toUpperCase()}
          </p>
      </div>
    );
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
  (
    current_tab,
    dark_mode
) => {
    return  {
      current_tab,
      dark_mode
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileTab);
