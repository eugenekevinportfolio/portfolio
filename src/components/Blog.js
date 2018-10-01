import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Blog.css';
import map from 'lodash/map';
import Moment from './Moment.js';
import Pictures from './Pictures.js';
import FullScreenImg from './FullScreenImg.js';
import light_top from '../img/TopGradient.png';
import dark_top from '../img/DarkTop.png';
import {
  storeMomentsTop,
  selectMoment,
  enterCarousel,
  selectPicture,
  autoPlay,
  fullScreenImage
} from '../actions/index.js';
import dark_top_arrow from '../img/TopArrow.png';
import light_top_arrow from '../img/LightTopArrow.png';
import dark_left_arrow from '../img/LeftArrow.png';
import dark_right_arrow from '../img/RightArrow.png';
import light_left_arrow from '../img/LightLeftArrow.png';
import light_right_arrow from '../img/LightRightArrow.png';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canPressKey: true,
      showDark: false,
      showLight: true,
      destroyedFullScreen: true
    }
  }

  componentDidMount() {
    const { dark_mode } = this.props;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("wheel", this.handleScroll);
    this.pressKey = this.pressKey.bind(this);
    window.addEventListener("keydown", this.pressKey);
    if (dark_mode) {
      this.setState({
        showLight: false,
        showDark: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { dark_mode, full_sreen_image } = this.props;
    const { showLight } = this.state;

    if (dark_mode !== prevProps.dark_mode) {
      if (showLight) {
        this.setState({showLight: false});
        setTimeout(
          () => this.setState({
            showDark: true,
          })
        , 300)
      }
      else {
        this.setState({showDark: false});
        setTimeout(
          () => this.setState({
            showLight: true,
          })
        , 300)
      }
    }

    if (prevProps.full_sreen_image.isFullScreen && !full_sreen_image.isFullScreen) {
      setTimeout(() => {
        this.setState({
          destroyedFullScreen: true
        })
      }, 300)
    }
    else if (!prevProps.full_sreen_image.isFullScreen && full_sreen_image.isFullScreen) {
      this.setState({
        destroyedFullScreen: false
      })
    }
  }

  renderMoments() {
    const { moments } = this.props;

    return map(
      moments,
      (moment, id) => <Moment key={id} {...moment} id={id}/>
    )
  }

  handleScroll(e) {
    const { moments, selected_moment, carousel } = this.props;
    const { canPressKey } = this.state;
    let current_moment_index = selected_moment.substring(7);

    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }
    const pictures_keys = Object.keys(current_set.pictures);
    const first_picture_id_of_current_set = pictures_keys[0];

    if (canPressKey) {
      if (!carousel.isOpen) {
        if (e.deltaY > 15 && moments["moment-" + (+current_moment_index+1)]) {
          this.props.selectMoment("moment-" + (+current_moment_index+1));
          this.setState({
            canPressKey: false
          });
          setTimeout(() => {
            this.setState({
              canPressKey: true
            })
          }, 600);
        }
        else if (e.deltaY < -15 && moments["moment-" + (+current_moment_index-1)]) {
          this.props.selectMoment("moment-" + (+current_moment_index-1));
          this.setState({
            canPressKey: false
          });
          setTimeout(() => {
            this.setState({
              canPressKey: true
            })
          }, 600);
        }
        else if (e.deltaX > 15) {
          this.setState({
            canPressKey: false
          });
          setTimeout(() => {
            this.setState({
              canPressKey: true
            })
          }, 600);
          this.props.autoPlay(true);
          this.props.enterCarousel(true);
          setTimeout(() => {
            this.props.selectPicture(first_picture_id_of_current_set)
          }, 700)
        }
      }
    }
  }

  pressKey(e) {
    const { moments, selected_moment, carousel, selected_picture, full_sreen_image } = this.props;
    const { canPressKey } = this.state;
    let current_moment_index = selected_moment.substring(7);

    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }
    const pictures_keys = Object.keys(current_set.pictures);
    const first_picture_id_of_current_set = pictures_keys[0];
    const index_of_selected_picture = pictures_keys.indexOf(selected_picture);


    if (canPressKey) {
      this.setState({
        canPressKey: false
      });
      if (!carousel.isOpen) {
        setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 600);
        if (e.keyCode === 40 && moments["moment-" + (+current_moment_index+1)]) {
          this.props.selectMoment("moment-" + (+current_moment_index+1));
        }
        else if (e.keyCode === 38 && moments["moment-" + (+current_moment_index-1)]) {
          this.props.selectMoment("moment-" + (+current_moment_index-1));
        }
        else if (e.keyCode === 39 || e.keyCode === 13) {
          this.props.autoPlay(true);
          this.props.enterCarousel(true);
          setTimeout(() => {
            this.props.selectPicture(first_picture_id_of_current_set)
          }, 700)
        }
      }
      else {
        setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 700);
        if (!full_sreen_image.isFullScreen) {
          if (e.keyCode === 27) {
            this.props.enterCarousel(false);
            this.props.selectPicture("");
          }
          else if (e.keyCode === 37 || e.keyCode === 8) {
            if (selected_picture === first_picture_id_of_current_set) {
              this.props.enterCarousel(false);
              this.props.selectPicture("");
            }
            else if (current_set.pictures[pictures_keys[index_of_selected_picture - 1]]) {
              this.props.selectPicture(pictures_keys[index_of_selected_picture - 1]);
            }
          }
          else if (e.keyCode === 39 && current_set.pictures[pictures_keys[index_of_selected_picture + 1]]) {
            this.props.selectPicture(pictures_keys[index_of_selected_picture + 1]);
          }
          else if (e.keyCode === 32) {
            this.props.autoPlay(!carousel.isAutoPlay);
          }
          else if (e.keyCode === 13) {
            this.props.fullScreenImage(current_set.pictures[selected_picture].src, true);
            this.props.autoPlay(false);
          }
        }
        else {
          if ((e.keyCode === 27 || e.keyCode === 13) && full_sreen_image.isFullScreen) {
            this.props.fullScreenImage(null,false);
            this.props.autoPlay(true);
          }
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.pressKey);
    this.pressKey = undefined;
    window.removeEventListener("wheel", this.handleScroll);
    this.handleScroll = undefined;
    // this.props.enterCarousel(false);
    // this.props.selectPicture("");
  }

  momentsScrollStyle() {
    const { moments_scroll } = this.props;

    return {
      top: moments_scroll.moments_move
    }
  }

  containerStyle() {
    const { carousel, window_dimensions } = this.props;

    if (window_dimensions.isDesktop) {
      if (carousel.isOpen) {
        return {
          transform: "scale(1.7)",
          left: "-300px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1000
        }
      }
      else {
        return {
          left: 0
        }
      }
    }
    else {
      if (carousel.isOpen) {
        return {
          transform: "scale(1.7)",
          top: "-520px",
          opacity: 0,
          pointerEvents: "none",
        }
      }
      else {
        return {
          top: 0
        }
      }
    }
  }

  arrowStyle(type, current_set, pictures_keys, index_of_selected_picture) {
    const { carousel } = this.props;

    if (type === "left") {
      if (carousel.isOpen) {
        if (!current_set.pictures[pictures_keys[index_of_selected_picture - 1]]) {
          return {
            opacity: 0.2,
            cursor: "default"
          }
        }
        else {
          return {
            cursor: "pointer"
          }
        }
      }
    }
    else {
      if (carousel.isOpen) {
        if (!current_set.pictures[pictures_keys[index_of_selected_picture + 1]]) {
          return {
            opacity: 0.2,
            cursor: "default"
          }
        }
        else {
          return {
            cursor: "pointer"
          }
        }
      }
    }

  }

  render() {
    const { dark_mode, window_dimensions, selected_moment, carousel, moments, selected_picture, burgerOpen } = this.props;
    const { showDark, showLight, destroyedFullScreen, canPressKey } = this.state;
    const top_arrow = dark_mode ? light_top_arrow : dark_top_arrow;
    let current_moment_index = selected_moment.substring(7);
    const sets_keys = Object.keys(carousel.sets);
    let current_set = {};
    for (let i = 0; i < sets_keys.length; i++) {
      if (carousel.sets[sets_keys[i]].parent === selected_moment) {
        current_set = carousel.sets[sets_keys[i]]
      }
    }
    const left_arrow = dark_mode ? light_left_arrow : dark_left_arrow;
    const right_arrow = dark_mode ? light_right_arrow : dark_right_arrow;
    const pictures_keys = Object.keys(current_set.pictures);
    const index_of_selected_picture = pictures_keys.indexOf(selected_picture);

    return (
      <div className="blog">
        <div
          style={carousel.isOpen ? {opacity: 1} : {transitionDelay: "0s"}}
          className="pictures-control">
          <img
            style={this.arrowStyle("left", current_set, pictures_keys, index_of_selected_picture)}
            id="pictures-left-arrow"
            onClick= {() => {
              if (canPressKey && carousel.isOpen) {
                if (current_set.pictures[pictures_keys[index_of_selected_picture - 1]]) {
                  this.props.selectPicture(pictures_keys[index_of_selected_picture - 1]);
                }
              }
            }}
            src={left_arrow}
            className="pictures-horizontal-arrow" />
          <img
            style={this.arrowStyle("right", current_set, pictures_keys, index_of_selected_picture)}
            onClick= {() => {
              if (canPressKey && carousel.isOpen) {
                if (current_set.pictures[pictures_keys[index_of_selected_picture + 1]]) {
                  this.props.selectPicture(pictures_keys[index_of_selected_picture + 1]);
                }
              }
            }}
            src={right_arrow}
            className="pictures-horizontal-arrow" />
        </div>
        <img
          onClick={() => {
            if (selected_moment !== "moment-9" && !carousel.isOpen && !(window_dimensions.isMobile && burgerOpen)) {
              if (canPressKey) {
                if (moments["moment-" + (+current_moment_index-1)]) {
                  this.props.selectMoment("moment-" + (+current_moment_index-1));
                }
              }
            }
          }}
          style={(selected_moment !== "moment-9" && !carousel.isOpen && !(window_dimensions.isMobile && burgerOpen)) ?
          {opacity: 1, cursor: "pointer"}
          : {transitionDuration: "0.2s"}}
          src={top_arrow}
          className="blog-top-arrow" />
        <div
          style={this.containerStyle()}
          className="moments-container">
          {showDark &&
            <img
              style={{opacity: 1}}
              src={dark_top}
              className="gradient"
              alt="top-gradient" /> }
          {showLight &&
            <img
              style={{opacity: 1}}
              src={light_top}
              className="gradient"
              alt="top-gradient" />
          }
          <div
            ref={(momentsScroll) => { this.momentsScroll = momentsScroll; }}
            style={this.momentsScrollStyle()}
            className="moments-scroll">
            {this.renderMoments()}
          </div>
        </div>
        {window_dimensions.isDesktop &&
          <Pictures />
        }
        {!destroyedFullScreen && <FullScreenImg />}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    storeMomentsTop,
    selectMoment,
    enterCarousel,
    selectPicture,
    autoPlay,
    fullScreenImage
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['window'],
  state => state['moments'],
  state => state['moments_scroll'],
  state => state['selected_moment'],
  state => state['carousel'],
  state => state['selected_picture'],
  state => state['full_sreen_image'],
  state => state['burgerOpen'],
  (
    dark_mode,
    window_dimensions,
    moments,
    moments_scroll,
    selected_moment,
    carousel,
    selected_picture,
    full_sreen_image,
    burgerOpen
) => {
    return  {
      dark_mode,
      window_dimensions,
      moments,
      moments_scroll,
      selected_moment,
      carousel,
      selected_picture,
      full_sreen_image,
      burgerOpen
    };
  }
);

export default connect(selector, matchDispatchToProps)(Blog);
