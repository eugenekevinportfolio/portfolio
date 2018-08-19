import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Pictures.css';
import map from 'lodash/map';
import light_play from '../img/Play.png';
import light_pause from '../img/Pause.png';
import dark_play from '../img/DarkPlay.png';
import dark_pause from '../img/DarkPause.png';
import Picture from './Picture.js';
import TimersContainer from './TimersContainer.js';
import Description from './Description.js';
import {
  autoPlay,
} from '../actions/index.js';

class Pictures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      differed_pictures: '',
    }
  }

  componentDidMount() {
    const { carousel, selected_moment } = this.props;

    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }
    this.setState({
      differed_pictures: current_set.pictures
    });
  }

  componentDidUpdate(prevProps) {
    const { carousel, selected_moment } = this.props;

    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }

    if (prevProps.selected_moment !== selected_moment) {
      setTimeout(() => {
        this.setState({
          differed_pictures: current_set.pictures
        });
      }, 600)
    }
  }

  renderPictures() {
    const { differed_pictures } = this.state;
    const current_set_pictures_ids = Object.keys(differed_pictures);

    return map(
      differed_pictures,
      (picture, id) => <Picture id={id} key={id} {...picture} current_set_pictures_ids={current_set_pictures_ids}/>
    )
  }

  carouselStyle() {
    const { carousel } = this.props;

    if (!carousel.isOpen) {
      return {
        // left: 245,
        transform: "scale(0.5)"
      }
    }
    else {
      return {
        // left: 5,
        transform: "scale(1)"
      }
    }
  }

  picturesScrollStyle() {
    const { pictures_scroll } = this.props;

    return {
      left: pictures_scroll.pictures_move
    }

  }

  picturesPartStyle() {
    const { carousel } = this.props;

    if (carousel.isOpen) {
      return {
        opacity: 1
      }
    }
    else {
      return {
        transitionDelay: "0s",
        transitionDuration: "0.25s"
      }
    }
  }

  picturesStyle() {
    const { carousel, window_dimensions } = this.props;

    if (window_dimensions.isDesktop) {
      if (!carousel.isOpen) {
        return {
          left: 210
        }
      }
      else {
        return {
          left: 110
        }
      }
    }
    else {
      if (!carousel.isOpen) {
        return {
          top: 330
        }
      }
      else {
        return {
          top: 0
        }
      }
    }
  }

  render() {
    const { moments, selected_moment, carousel, dark_mode } = this.props;
    const current_moment = moments[selected_moment];
    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }
    const light_control = carousel.isAutoPlay ? light_pause : light_play;
    const dark_control = carousel.isAutoPlay ? dark_pause : dark_play;
    const control = dark_mode ? dark_control : light_control;
    const control_text = carousel.isAutoPlay ? "Autoplay On" : "Autoplay Off";


    return (
      <div
        style={this.picturesStyle()}
        className="pictures">
        <div
          className="pictures-container">
          <div
            style={this.picturesPartStyle()}
            className="top-pictures">
            <p
              style={dark_mode ? {color: "white"} : {}}
              className="diapo-title">
              {current_moment.title.toUpperCase()}
            </p>
            <div
              style={dark_mode ? {backgroundColor: "white"} : {}}
              onClick={() => {
                this.props.autoPlay(!carousel.isAutoPlay);
              }}
              className="play-button">
              <img
                style={!carousel.isAutoPlay ? {
                  marginTop: -1,
                  marginLeft: 2
                } : {}}
                src={control} className= "play" alt="play" />
            </div>
            <p style={dark_mode ? {color: "white"} : {}}>
              {control_text}
            </p>
          </div>
          <div
            style={this.carouselStyle()}
            className="middle-pictures">
            <div
              style={this.picturesScrollStyle()}
              className="pictures-scroll">
              {this.renderPictures()}
            </div>
          </div>
          <TimersContainer current_set_pictures={current_set.pictures}/>
        </div>
        <Description current_set_pictures={current_set.pictures}/>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    autoPlay,
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_moment'],
  state => state['window'],
  state => state['dark_mode'],
  state => state['carousel'],
  state => state['moments'],
  state => state['pictures_scroll'],
  (
    selected_moment,
    window_dimensions,
    dark_mode,
    carousel,
    moments,
    pictures_scroll
) => {
    return  {
      selected_moment,
      window_dimensions,
      dark_mode,
      carousel,
      moments,
      pictures_scroll
    };
  }
);

export default connect(selector, matchDispatchToProps)(Pictures);
