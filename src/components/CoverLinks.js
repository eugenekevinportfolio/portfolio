import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import light_medium_img from '../img/Medium.png';
import light_reddit_img from '../img/Reddit.png';
import dark_medium_img from '../img/DarkMedium.png';
import dark_reddit_img from '../img/DarkReddit.png';
import { openConcept } from '../actions/index.js';
import '../styles/Concepts.css';

class CoverLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transitioning: false
    }
  }

  coverStyle() {
    const { current_cover_index } = this.props;

    switch (current_cover_index) {
      case 0:
        return {
          left: 0
        }
      case 1:
        return {
          left: "calc(50% - 30px)"
        }
      case 2:
        return {
          left: "calc(100% - 60px)"
        }
    }
  }

  componentDidUpdate(prevProps) {
    const { current_cover } = this.props;

    if (prevProps.current_cover !== current_cover) {
      this.timeout && clearTimeout(this.timeout);
      this.setState({transitioning: true});
      this.timeout = setTimeout(() => {
        this.setState({transitioning: false});
      }, 750);
    }
  }

  linksStyle(reddit, ready) {
    const { transitioning } = this.state;
    if (transitioning) {
      if (ready) {
        if (reddit) {
          return {
            left: "calc(50% - 152.375px)",
            opacity: 0,
          }
        }
        else {
          return {
            left: "calc(50% - 122.375px)",
            opacity: 0,
          }
        }
      }
      else {
        return {
          left: "calc(50% - 117.71px)",
          opacity: 0
        }
      }
    }
    else {
      if (ready) {
        if (reddit) {
          return {
            left: "calc(50% - 152.375px)"
          }
        }
        else {
          return {
            left: "calc(50% - 122.375px)"
          }
        }
      }
      else {
        return {
          left: "calc(50% - 117.71px)"
        }
      }
    }
  }

  readStyle() {
    const { dark_mode } = this.props;
    if (dark_mode) {
      return {
        color: "black",
        backgroundColor: "white"
      }
    }
  }

  emptyReadStyle() {
    const { dark_mode } = this.props;
    if (dark_mode) {
      return {
        color: "white",
        borderColor: "white"
      }
    }
  }

  render() {
    const { covers, desync_current_cover, dark_mode } = this.props;
    const medium = covers[desync_current_cover].medium;
    const reddit = covers[desync_current_cover].reddit;
    const ready = covers[desync_current_cover].ready;
    const medium_img = dark_mode ? dark_medium_img : light_medium_img;
    const reddit_img = dark_mode ? dark_reddit_img : light_reddit_img;

    return(
      <div
        style={this.linksStyle(reddit, ready)}
        className="cover-links">
        {ready ?
          <div
            onClick={() => { this.props.openConcept(true) }}
            style={this.readStyle()}
            className="read-story">
            READ THE STORY
          </div>
          :
          <div
            style={this.emptyReadStyle()}
            className="empty-read-story">
            COMING SOON
          </div>
        }
        <div
          style={dark_mode ? {backgroundColor: "white"}: {}}
          className="cover-partition" />
        <a
          href={medium}
          target="_blank">
          <img
            id="medium"
            className="cover-img"
            src={medium_img} />
        </a>
        {reddit &&
          <a
            href={reddit}
            target="_blank">
            <img
              className="cover-img"
              src={reddit_img} />
          </a>
        }
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openConcept
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['covers'],
  (
    dark_mode,
    covers
) => {
    return  {
      dark_mode,
      covers
    };
  }
);

export default connect(selector, matchDispatchToProps)(CoverLinks);
