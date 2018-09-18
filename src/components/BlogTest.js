import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Moment from './Moment.js';
import map from 'lodash/map';
import {
  selectMoment,
} from '../actions/index.js';

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


  render() {
    const { window_dimensions, dark_mode } = this.props;

    return (
      <div className="blog">
        {window_dimensions.isDesktop &&
          <p
            style={dark_mode ? {color: "white"} : {}}
            className="Left-name">
            Kevin Eugene
          </p>
        }
        <div
          onScroll={() => this.handleScroll()}
          className="moments-container">
          {this.renderMoments()}
        </div>
        <div className="pictures-container">

        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectMoment
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['moments'],
  state => state['window'],
  state => state['selected_moment'],
  (
    dark_mode,
    moments,
    window_dimensions,
    selected_moment
) => {
    return {
      dark_mode,
      moments,
      window_dimensions,
      selected_moment
    };
  }
);

export default connect(selector, matchDispatchToProps)(BlogTest);
