import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  moveTimers,
  selectPicture,
  autoPlay
} from '../actions/index.js';

class Timer extends Component {
  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = undefined;
    this.props.autoPlay(false);
  }

  componentDidUpdate(prevProps) {
    const { id, selected_picture, timers_scroll, carousel, selected_moment } = this.props;

    const timer_left = this.timer.getBoundingClientRect().left;

    // Move timer
    if (prevProps.selected_picture !== selected_picture) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = undefined;
      if (id === selected_picture) {
        this.props.moveTimers(timers_scroll.timers_left - timer_left);
      }
    }

    // Determine autoplay
    if (carousel.isAutoPlay) {
      if (id === selected_picture && !this.timeout) {
        const sets_keys = Object.keys(carousel.sets);
        let current_set = {};
        for (let i = 0; i < sets_keys.length; i++) {
          if (carousel.sets[sets_keys[i]].parent === selected_moment) {
            current_set = carousel.sets[sets_keys[i]]
          }
        }
        const pictures_keys = Object.keys(current_set.pictures);
        const index_of_selected_picture = pictures_keys.indexOf(selected_picture);

          this.timeout = setTimeout(() => {
            if (current_set.pictures[pictures_keys[index_of_selected_picture + 1]]) {
              this.props.selectPicture(pictures_keys[index_of_selected_picture + 1]);
            }
            else {
              this.props.autoPlay(false);
            }
          }, 15000);
      }
    }
    else {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  progressStyle() {
    const { id, selected_picture, carousel, dark_mode } = this.props;
    if (dark_mode) {
      if (id === selected_picture) {
        if (carousel.isAutoPlay) {
          return {
            backgroundColor: "white",
            width: "100%"
          }
        }
        else {
          return {
            width: 0,
            transitionDuration: "0.5s",
            backgroundColor: "white",
          }
        }
      }
      else {
        return {
          transitionDuration: "1s",
          backgroundColor: "white",
        }
      }
    }
    else {
      if (id === selected_picture) {
        if (carousel.isAutoPlay) {
          return {
            width: "100%"
          }
        }
        else {
          return {
            width: 0,
            transitionDuration: "0.5s"
          }
        }
      }
      else {
        return {
          transitionDuration: "1s"
        }
      }
    }
  }

  progressBarStyle() {
    const { carousel } = this.props;

    if (!carousel.isAutoPlay) {
      return {
        // backgroundColor: "black",
        // opacity: 0.5,
        height: 3
      }
    }
  }

  render() {
    const { selected_picture, id, title, location, dark_mode, carousel } = this.props;
    return (
      <div
        onClick={() => {
          if (carousel.isOpen && id !== selected_picture) {
            this.props.selectPicture(id);
          }
        }}
        ref={(timer) => this.timer = timer}
        style={selected_picture!==id ? {opacity: 0.2} : {}}
        className="timer">
        <div className="above-timer">
          <p
            style={dark_mode ? {color: "white"} : {}}
            className="picture-name">
            {title.toUpperCase()}
          </p>
          <p
            style={dark_mode ? {color: "white"} : {}}
            className="picture-location">
            {location.toUpperCase()}
          </p>
        </div>
        <div
          style={this.progressBarStyle()}
          className="progress-box">
          <div
            style={this.progressStyle()}
            className="progress-bar">
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    moveTimers,
    selectPicture,
    autoPlay
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_picture'],
  state => state['selected_moment'],
  state => state['timers_scroll'],
  state => state['carousel'],
  state => state['dark_mode'],
  (
    selected_picture,
    selected_moment,
    timers_scroll,
    carousel,
    dark_mode
) => {
    return  {
      selected_picture,
      selected_moment,
      timers_scroll,
      carousel,
      dark_mode
    };
  }
);

export default connect(selector, matchDispatchToProps)(Timer);
