import React, { Component } from 'react';
import NavBar from './NavBar.js';
import MobileNavBar from './MobileNavBar.js';
import Home from './Home.js';
import HomeTest from './HomeTest.js';
import Concepts from './Concepts.js';
import Article from './Article.js';
import Blog from './Blog.js';
import MobileBlog from './MobileBlog.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/App.css';
import {
  switchToMobile,
  switchToDesktop,
  storeWindowDimensions,
  enterCarousel,
  selectPicture
} from '../actions/index.js';
import back from '../img/Back.png';
import light_back from '../img/LightBack.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // desync_concept_open: false
    }
  }

  updateDimensions() {
    const { window_dimensions } = this.props;
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    }, 400);

    if (window.innerWidth < 810) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    }
    else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const { window_dimensions } = this.props;
    this.props.storeWindowDimensions(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 810) {
      // Trigger mobile version
      !window_dimensions.isMobile && this.props.switchToMobile();
    }
    else {
      // Trigger desktop version
      !window_dimensions.isDesktop && this.props.switchToDesktop();
    }
  }

  componentDidUpdate(prevProps) {
    const { dark_mode, concept_open } = this.props;

    if (prevProps.dark_mode !== dark_mode) {
      this.setState({transitioning: true});
      setTimeout(() => {
        this.setState({transitioning: false});
      }, 300)
    }

    // // Desync concept open for animation
    // if (!prevProps.concept_open && concept_open) {
    //   this.setState({ desync_concept_open: concept_open});
    // }
    // else if (prevProps.concept_open && !concept_open) {
    //   setTimeout(() => {
    //     this.setState({ desync_concept_open: concept_open});
    //   }, 500)
    // }
  }

  leftStyle() {
    const { dark_mode, carousel, current_tab } = this.props;

    if (dark_mode) {
      if (carousel.isOpen && current_tab === "blog") {
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
      if (carousel.isOpen && current_tab === "blog") {
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

  renderModule() {
    const { current_tab, window_dimensions } = this.props;

    switch (current_tab) {
      case "home":
        return (
          // <Home />
          <HomeTest />
        );
      case "blog":
      if (window_dimensions.isDesktop) {
        return (
          <Blog />
        );
      }
      else {
        return (
          <MobileBlog />
        );
      }
      case "concepts":
      return (
        <Concepts />
      );
    }
  }

  backStyle() {
    const { carousel, current_tab, dark_mode } = this.props;

    if (dark_mode) {
      if (carousel.isOpen && current_tab === "blog") {
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
      if (carousel.isOpen && current_tab === "blog") {
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

  render() {
    const { window_dimensions, dark_mode, current_tab } = this.props;
    // const { desync_concept_open } = this.state;
    const arrow = dark_mode ? light_back : back;
    return (
      <div
        id="app"
        style={dark_mode ? {backgroundColor: "#262626"} : {}}
        className="app">
        {window_dimensions.isDesktop ?
          <NavBar />:
          <MobileNavBar />
        }
        {/* <div className="below-nav"> */}
          {/* {window_dimensions.isDesktop &&  current_tab !== "concepts" &&
            <div className="left-below-nav">
              <p
                style={this.leftStyle()}
                className="Left-name">
                Kevin Eugene
              </p>
              <div
                onClick={() => {
                  this.props.enterCarousel(false);
                  this.props.selectPicture("");
                }}
                style={this.backStyle()}
                className="back-button">
                <img src={arrow} className="back" alt="back" />
              </div>
            </div>
          } */}
          {/* <div className="module-container"> */}
            {this.renderModule()}
            {current_tab === "concepts" && <Article />}
          {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    storeWindowDimensions,
    switchToMobile,
    switchToDesktop,
    enterCarousel,
    selectPicture
  }, dispatch)
}

const selector = createSelector(
  state => state['window'],
  state => state['dark_mode'],
  state => state['current_tab'],
  state => state['carousel'],
  state => state['concept_open'],
  (
    window_dimensions,
    dark_mode,
    current_tab,
    carousel,
    concept_open
) => {
    return  {
      window_dimensions,
      dark_mode,
      current_tab,
      carousel,
      concept_open
    };
  }
);

export default connect(selector, matchDispatchToProps)(App);
