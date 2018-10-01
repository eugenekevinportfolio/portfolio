import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  selectMoment,
  moveMoments,
  storeMomentsTop,
  enterCarousel,
  selectPicture,
  autoPlay
} from '../actions/index.js';
import light_play from '../img/Play.png';
import dark_play from '../img/DarkPlay.png';

class Moment extends Component {
  momentStyle() {
    const { id, selected_moment } = this.props;

    if (id !== selected_moment) {
      return {
        opacity: "0.2"
      }
    }
    else {
      return {
        cursor: "pointer"
      }
    }
  }

  render() {
    const { date, title, paragraph, id, selected_moment, carousel, dark_mode } = this.props;
    const control = dark_mode ? dark_play : light_play;

    return (
      <div
        id={id === "moment-2" ? "last-moment" : ""}
        style={this.momentStyle()}
        ref={(moment) => { this.moment = moment }}
        onClick={() => {
          const sets_keys = Object.keys(carousel.sets);
          let current_set = {};
          for (let i = 0; i < sets_keys.length; i++) {
            if (carousel.sets[sets_keys[i]].parent === selected_moment) {
              current_set = carousel.sets[sets_keys[i]]
            }
          }
          const first_picture_id_of_current_set = Object.keys(current_set.pictures)[0];

          if (id === selected_moment) {
            this.props.enterCarousel(true);
            this.props.selectPicture(first_picture_id_of_current_set);
            // setTimeout(() => {
            // }, 700)
          }
        }}
        className="moment-container">
        <div
          style={dark_mode ? {backgroundColor: "#262626"} : {}}
          className="moment-date">
          <p style={dark_mode ? {color: "white"} : {}}>
            {date.toUpperCase()}
          </p>
        </div>
        <div
          style={dark_mode ? {borderColor: "white"} : {}}
          className="moment">
          <h1 style={dark_mode ? {color: "white"} : {}}>
            {title.toUpperCase()}
          </h1>
          <p style={dark_mode ? {color: "white"} : {}}>
            {paragraph}
          </p>
        </div>
        <div
          style={id !== selected_moment ? {opacity: 0} : {}}
          className="start">
          <div
            style={dark_mode ? {backgroundColor: "white"} : {}}
            className="play-button">
            <img src={control} className= "play" alt="play" />
          </div>
          <p style={dark_mode ? {color: "white"} : {}}>
            Start
          </p>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectMoment,
    moveMoments,
    storeMomentsTop,
    enterCarousel,
    selectPicture,
    autoPlay
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_moment'],
  state => state['moments_scroll'],
  state => state['carousel'],
  state => state['dark_mode'],
  state => state['window'],
  (
    selected_moment,
    moments_scroll,
    carousel,
    dark_mode,
    window_dimensions
) => {
    return  {
      selected_moment,
      moments_scroll,
      carousel,
      dark_mode,
      window_dimensions
    };
  }
);

export default connect(selector, matchDispatchToProps)(Moment);
