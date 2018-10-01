import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import Picture from './Picture.js';
import TimersContainer from './TimersContainer.js';
import Description from './Description.js';
import {
  selectPicture,
} from '../actions/index.js';

class PicturesTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_pictures: '',
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
      desync_pictures: current_set.pictures
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
          desync_pictures: current_set.pictures
        });
      }, 600)
    }
  }

  renderPictures() {
    const { desync_pictures } = this.state;
    const current_set_pictures_ids = Object.keys(desync_pictures);

    return map(
      desync_pictures,
      (picture, id) => <Picture id={id} key={id} {...picture} current_set_pictures_ids={current_set_pictures_ids}/>
    )
  }

  containerStyle() {
    const { carousel, window_dimensions } = this.props;

    if (window_dimensions.isDesktop) {
      if (carousel.isOpen) {
        return {
          // transform: "scale(0.65)",
          left: 95
        }
      }
      else {
        return {
          transform: "scale(0.6)",
        }
      }
    }
    // else {
    //   if (!carousel.isOpen) {
    //     return {
    //       transform: "translateY(90)",
    //       opacity: 0
    //     }
    //   }
    // }
  }

  picturesStyle() {
    const { window_dimensions, carousel } = this.props;

    if (carousel.isOpen) {
      return {
        overflowX: "scroll",
        width: 1570
      }
    }
  }

  handleScroll() {
    const { selected_picture } = this.props;
    const { desync_pictures } = this.state;
    const current_set_pictures_ids = Object.keys(desync_pictures);
    const page_threshold = 130;
    const pictures_array = document.getElementsByClassName("picture");
    const pictures_left = [];
    for (let i = 0; i < pictures_array.length; i++) {
      pictures_left[i] = pictures_array[i].getBoundingClientRect().left;
    }
    const distance_to_center = [];
    for (let i = 0; i < pictures_left.length; i++) {
      distance_to_center[i] = Math.abs(pictures_left[i] - page_threshold);
    }
    const minimum_distance = Math.min(...distance_to_center);
    const index_of_min = distance_to_center.indexOf(minimum_distance);
    const id_to_focus = current_set_pictures_ids[index_of_min];
    id_to_focus !== selected_picture && this.props.selectPicture(id_to_focus);
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

    return (
      <div
        className="pictures-container"
        style={this.containerStyle()}>
        <div
          style={carousel.isOpen ? {} : {transitionDelay: "0s", opacity: 0}}
          className="top-pictures">
          <h1
            style={dark_mode ? {color: "white"} : {}}
            className="diapo-title">
            {current_moment.title.toUpperCase()}
          </h1>
        </div>
        <div className="pictures-middle-part">
          <div
            onScroll={() => this.handleScroll()}
            style={this.picturesStyle()}
            className="pictures">
            {this.renderPictures()}
          </div>
        </div>
        <div
          className="pictures-low-part"
          style={carousel.isOpen ? {transitionDelay: "0.7s"} : {transitionDelay: "0s", opacity: 0}}>
          <TimersContainer current_set_pictures={current_set.pictures}/>
        </div>
        <div
          className="pictures-extra-low-part"
          style={carousel.isOpen ? {transitionDelay: "0.8s"} : {transitionDelay: "0s", opacity: 0}}>
          <Description current_set_pictures={current_set.pictures}/>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPicture
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['moments'],
  state => state['window'],
  state => state['selected_moment'],
  state => state['selected_picture'],
  state => state['carousel'],
  (
    dark_mode,
    moments,
    window_dimensions,
    selected_moment,
    selected_picture,
    carousel
) => {
    return {
      dark_mode,
      moments,
      window_dimensions,
      selected_moment,
      selected_picture,
      carousel
    };
  }
);

export default connect(selector, matchDispatchToProps)(PicturesTest);
