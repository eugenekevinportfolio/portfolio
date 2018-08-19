import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index.js';

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
    const { text, id, dark_mode, current_tab } = this.props;
    return (
      <div
        style={this.selectorStyle()}
        className="tab"
        onClick={() => {
          this.props.selectTab(id)
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab
  }, dispatch)
}

const selector = createSelector(
  state => state['current_tab'],
  state => state['dark_mode'],
  state => state['home_finished'],
  (
    current_tab,
    dark_mode,
    home_finished
) => {
    return  {
      current_tab,
      dark_mode,
      home_finished
    };
  }
);

export default connect(selector, matchDispatchToProps)(Tab);
