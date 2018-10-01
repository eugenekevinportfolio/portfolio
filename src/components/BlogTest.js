import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Moment from './Moment.js';
import map from 'lodash/map';
import {
  selectMoment,
  enterCarousel,
  selectPicture
} from '../actions/index.js';
import PicturesTest from './PicturesTest.js';
import back from '../img/Back.png';
import light_back from '../img/LightBack.png';
import dark_back_up from '../img/Back_Up.png';

class BlogTest extends Component {
  renderMoments() {
    const { moments } = this.props;

    return map(
      moments,
      (moment, id) => <Moment key={id} {...moment} id={id}/>
    )
  }

  handleScroll() {
    const { window_dimensions, moments, selected_moment } = this.props;
    const page_center = window_dimensions.height/2 + 10;
    const moments_array = document.getElementsByClassName("moment-container");
    const moments_center = [];
    for (let i = 0; i < moments_array.length; i++) {
      moments_center[i] = (moments_array[i].getBoundingClientRect().top + moments_array[i].getBoundingClientRect().bottom)/2
    }
    const distance_to_center = [];
    for (let i = 0; i < moments_center.length; i++) {
      distance_to_center[i] = Math.abs(moments_center[i] - page_center);
    }
    const minimum_distance = Math.min(...distance_to_center);
    const index_of_min = distance_to_center.indexOf(minimum_distance);
    const id_to_focus = Object.keys(moments)[index_of_min];
    id_to_focus !== selected_moment && this.props.selectMoment(id_to_focus);
  }

  containerStyle() {
    const { carousel, window_dimensions } = this.props;

    if (window_dimensions.isDesktop) {
      if (carousel.isOpen) {
        return {
          transform: "scale(1.7) translateX(-500px)",
          zIndex: 100,
          opacity: 0,
          pointerEvents: "none",
        }
      }
    }
    else {
      if (carousel.isOpen) {
        return {
          transform: "translateY(-300px)",
          opacity: 0,
          pointerEvents: "none",
        }
      }
    }
  }

  backStyle() {
    const { carousel, dark_mode } = this.props;

    if (dark_mode) {
      if (carousel.isOpen) {
        return {
          opacity: 1,
          transform: "scale(1)",
          pointerEvents: "auto",
          borderColor: "white",
          transitionDelay: "0.7s"
        }
      }
      else {
        return {
          transitionDelay: "0s",
          borderColor: "white"
        }
      }
    }
    else {
      if (carousel.isOpen) {
        return {
          opacity: 1,
          transform: "scale(1)",
          pointerEvents: "auto",
          transitionDelay: "0.7s"
        }
      }
      else {
        return {
          transitionDelay: "0s"
        }
      }
    }
  }

  leftStyle() {
    const { dark_mode, carousel } = this.props;

    if (dark_mode) {
      if (carousel.isOpen) {
        return {
          opacity: 0,
          color: "white"
        }
      }
      else {
        return {
          transitionDelay: "0.6s",
          color: "white"
        }
      }
    }
    else {
      if (carousel.isOpen) {
        return {
          opacity: 0,
        }
      }
      else {
        return {
          transitionDelay: "0.6s"
        }
      }
    }
  }

  renderPictures() {
    const { window_dimensions, carousel } = this.props;

    if (window_dimensions.isDesktop) {
      return <PicturesTest />
    }
    else {
      if (carousel.isOpen) {
        return <PicturesTest />
      }
    }
  }

  mobileBackdownStyle() {
    const { dark_mode, carousel } = this.props;

    if (dark_mode) {
      if (carousel.isOpen) {
        return {
          transitionDelay: "0.5s",
          borderColor: "white",
          pointerEvents: "auto",
        }
      }
      else {
        return {
          transform: "scale(0.7)",
          opacity: 0,
          borderColor: "white"
        }
      }
    }
    else {
      if (carousel.isOpen) {
        return {
          transitionDelay: "0.5s",
          pointerEvents: "auto",
        }
      }
      else {
        return {
          transform: "scale(0.7)",
          opacity: 0
        }
      }
    }
  }

  render() {
    const { window_dimensions, dark_mode } = this.props;
    const arrow = dark_mode ? light_back : back;

    return (
      <div className="blog">
        {window_dimensions.isDesktop ?
          <div>
            <p
              style={this.leftStyle()}
              className="Left-name">
              Kevin Eugene
            </p>
            <div
              onClick={() => {
                this.props.enterCarousel(false);
                this.props.selectPicture("");
                const pictures_DOM = document.getElementsByClassName("pictures");
                pictures_DOM[0].scrollLeft = 0;
              }}
              style={this.backStyle()}
              className="back-button">
              <img src={arrow} className="back" alt="back" />
            </div>
          </div>
          :
          <div
            onClick={() => {
              this.props.enterCarousel(false);
            }}
            style={this.mobileBackdownStyle()}
            className="mobile-back-down-button-pictures">
            <img src={dark_back_up} className="back-down-img" />
          </div>
        }
        <div
          onScroll={() => this.handleScroll()}
          style={this.containerStyle()}
          className="moments-container">
          {this.renderMoments()}
        </div>
        {this.renderPictures()}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectMoment,
    enterCarousel,
    selectPicture
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['moments'],
  state => state['window'],
  state => state['selected_moment'],
  state => state['carousel'],
  (
    dark_mode,
    moments,
    window_dimensions,
    selected_moment,
    carousel
) => {
    return {
      dark_mode,
      moments,
      window_dimensions,
      selected_moment,
      carousel
    };
  }
);

export default connect(selector, matchDispatchToProps)(BlogTest);
