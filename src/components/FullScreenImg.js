import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Fullscreen.css';
import {
  fullScreenImage,
  autoPlay
} from '../actions/index.js';

class FullScreenImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpaque: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isOpaque: true
      })
    }, 20)
  }

  componentDidUpdate(prevProps) {
    const { full_sreen_image } = this.props;

    if (prevProps.full_sreen_image.isFullScreen && !full_sreen_image.isFullScreen) {
      this.setState({
        isOpaque: false
      })
    }
  }

  fullScreenStyle() {
    const { isOpaque } = this.state;
    const { dark_mode } = this.props;

    if (dark_mode) {
      if (isOpaque) {
        return {
          opacity: 1,
          backgroundColor: "#262626"
        }
      }
      else {
        return {
          backgroundColor: "#262626"
        }
      }
    }
    else {
      if (isOpaque) {
        return {
          opacity: 1
        }
      }
    }
  }

  render() {
    const { full_sreen_image } = this.props;
    return (
      <div
        onClick={() => {
          this.props.fullScreenImage(null,false);
          this.props.autoPlay(true);
        }}
        style={this.fullScreenStyle()}
        className="fullscreen">
        <img
          onClick={(e) => e.stopPropagation()}
          src={full_sreen_image.src}/>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fullScreenImage,
    autoPlay
  }, dispatch)
}

const selector = createSelector(
  state => state['full_sreen_image'],
  state => state['dark_mode'],
  (
    full_sreen_image,
    dark_mode,
) => {
    return  {
      full_sreen_image,
      dark_mode,
    };
  }
);

export default connect(selector, matchDispatchToProps)(FullScreenImg);
