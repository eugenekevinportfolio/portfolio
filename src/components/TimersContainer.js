import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import Timer from './Timer.js';
import '../styles/Timers.css';

class TimersContainer extends Component {
  timersContainerStyle() {
    const { carousel } = this.props;

    if (carousel.isOpen) {
      return {
        opacity: 1
      }
    }
    else {
      return {
        transitionDelay: "0s",
        transitionDuration: "0.25s",
      }
    }
  }

  timersScrollStyle() {
    const { timers_scroll } = this.props;

    return {
      left: timers_scroll.timers_move
    }

  }

  renderTimers() {
    const { current_set_pictures } = this.props;

    return map(
      current_set_pictures,
      (picture, id) => <Timer key={id} {...picture} id={id} />
    )

  }

  render() {
    return (
      <div
        style={this.timersContainerStyle()}
        className="timers-container">
        <div
          style={this.timersScrollStyle()}
          className="timers-scroll">
          {this.renderTimers()}
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
  (
    carousel,
    timers_scroll
) => {
    return  {
      carousel,
      timers_scroll
    };
  }
);

export default connect(selector, matchDispatchToProps)(TimersContainer);
