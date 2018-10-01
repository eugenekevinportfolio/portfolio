import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import Timer from './Timer.js';
import '../styles/Timers.css';

class TimersContainer extends Component {
  render() {
    const { selected_picture, current_set_pictures } = this.props;

    return (
      <div className="timers-container">
        <div className="timers-scroll">
          <Timer current_set_pictures={current_set_pictures} id={selected_picture}/>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

const selector = createSelector(
  state => state['carousel'],
  state => state['timers_scroll'],
  state => state['selected_picture'],
  (
    carousel,
    timers_scroll,
    selected_picture
) => {
    return  {
      carousel,
      timers_scroll,
      selected_picture
    };
  }
);

export default connect(selector, matchDispatchToProps)(TimersContainer);
