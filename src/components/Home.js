import React, { Component } from 'react';
import map from 'lodash/map';
import Intro from './Intro.js';
import InvisibleHome from './InvisibleHome.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  introFocus,
  finishHome
} from '../actions/index.js';
import '../styles/Home.css';
import light_top from '../img/TopGradient.png';
import light_bottom from '../img/BottomGradient.png';
import dark_top from '../img/DarkTop.png';
import dark_bottom from '../img/DarkBottom.png';
import dark_top_arrow from '../img/TopArrow.png';
import dark_down_arrow from '../img/DownArrow.png';
import light_top_arrow from '../img/LightTopArrow.png';
import light_down_arrow from '../img/LightDownArrow.png';
import resume from '../img/Resume.pdf';
import dark_resume from '../img/DarkResume.pdf';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLight: true,
      showDark: false,
      canPressKey: true
    }
  }

  componentWillReceiveProps(prevProps) {
    const { dark_mode } = this.props;
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
  }

  componentDidMount() {
    const { intros, dark_mode } = this.props;
    const intro_keys = Object.keys(intros);
    this.setState({state_intros: intros[intro_keys[0]]});
    if (dark_mode) {
      this.setState({
        showLight: false,
        showDark: true
      });
    }
  }

  renderIntro() {
    const { intros } = this.props;
    return(
      map(
        intros,
        (intro, index) => <Intro key={index} {...intro} id={index}/>
      )
    );
  }

  introContainerStyle() {
    const { previousTop } = this.props.move;
    return {
      top: previousTop,
    }
  }

  downloadStyle() {
    const { home_finished, dark_mode } = this.props;

    if (dark_mode) {
      if (!home_finished) {
        return {
          transform: "scale(0.7)",
          opacity: 0,
          cursor: "default",
          backgroundColor: "white",
          color: "black"
        }
      }
      else {
        return {
          backgroundColor: "white",
          color: "black"
        }
      }
    }
    else {
      if (!home_finished) {
        return {
          transform: "scale(0.7)",
          opacity: 0,
          cursor: "default"
        }
      }
    }

  }

  render() {
    const { dark_mode, intros, intro_focus, window_dimensions, home_finished, burgerOpen } = this.props;
    const { showDark, showLight, canPressKey } = this.state;
    const intro_keys = Object.keys(intros);
    const current_intro_index = intro_keys.indexOf(intro_focus);
    const top_arrow = dark_mode ? light_top_arrow : dark_top_arrow;
    const down_arrow = dark_mode ? light_down_arrow : dark_down_arrow;

    return (
      <div
        id="home"
        className="home">
        <InvisibleHome />
        {window_dimensions.isDesktop ?
          <div className="home-controls">
            <img
              style={!intro_keys[current_intro_index - 1] ? {
                opacity: 0.2,
                cursor: "default"
              } : {}}
              onClick= {() => {
                if (canPressKey) {
                  intro_keys[current_intro_index - 1] && this.props.introFocus(intro_keys[current_intro_index - 1]);
                  this.setState({
                    canPressKey: false
                  });
                  this.timeout = setTimeout(() => {
                    this.setState({
                      canPressKey: true
                    })
                  }, 400);
                }
              }}
              src={top_arrow}
              className="arrow" />
            <img
              style={!intro_keys[current_intro_index + 1] ? {
                opacity: 0.2,
                cursor: "default"
              } : {}}
              onClick= {() => {
                if (canPressKey) {
                  intro_keys[current_intro_index + 1] && this.props.introFocus(intro_keys[current_intro_index + 1]);
                  if (current_intro_index + 1 === intro_keys.length - 1) {
                    !home_finished && this.props.finishHome();
                  }
                  this.setState({
                    canPressKey: false
                  });
                  this.timeout = setTimeout(() => {
                    this.setState({
                      canPressKey: true
                    })
                  }, 400);
                }
              }}
              src={down_arrow}
              className="arrow" />
          </div>
          :
          <div>
            <img
              style={!intro_keys[current_intro_index - 1] ? {
                opacity: 0.2,
                cursor: "default"
              } : {}}
              onClick= {() => {
                if (canPressKey) {
                  intro_keys[current_intro_index - 1] && this.props.introFocus(intro_keys[current_intro_index - 1]);
                  this.setState({
                    canPressKey: false
                  });
                  this.timeout = setTimeout(() => {
                    this.setState({
                      canPressKey: true
                    })
                  }, 400);
                }
              }}
              src={top_arrow}
              id="top-arrow"
              className="arrow" />
            <img
              style={!intro_keys[current_intro_index + 1] ? {
                opacity: 0.2,
                cursor: "default"
              } : {}}
              onClick= {() => {
                if (canPressKey) {
                  intro_keys[current_intro_index + 1] && this.props.introFocus(intro_keys[current_intro_index + 1]);
                  if (current_intro_index + 1 === intro_keys.length - 1) {
                    this.props.finishHome();
                  }
                  this.setState({
                    canPressKey: false
                  });
                  this.timeout = setTimeout(() => {
                    this.setState({
                      canPressKey: true
                    })
                  }, 400);
                }
              }}
              src={down_arrow}
              id="down-arrow"
              className="arrow" />
          </div>
        }
        <div
          className="home-center">
          {/* Quick fix, because of stacking contexts */}
          {showDark && !burgerOpen &&
            <img
              style={showDark ? {opacity: 1} : {}}
              src={dark_top}
              className="gradient"
              alt="top-gradient" /> }
          {showLight && !burgerOpen &&
            <img
              style={showLight ? {opacity: 1} : {}}
              src={light_top}
              className="gradient"
              alt="top-gradient" />
          }
          <div
            className="intro-container"
            style={this.introContainerStyle()}>
            {this.renderIntro()}
          </div>
          {showDark && !burgerOpen &&
            <img
              style={showDark ? {opacity: 1} : {}}
              src={dark_bottom}
              className="gradient"
              alt="top-gradient" /> }
          {showLight && !burgerOpen &&
            <img
              style={showLight ? {opacity: 1} : {}}
              src={light_bottom}
              className="gradient"
              alt="top-gradient" />
          }
        </div>
        <a
          href={home_finished ? (dark_mode ? dark_resume : resume) : "false"}
          target="_blank"
          style={this.downloadStyle()}
          className="download">
          DOWNLOAD MY RESUME
        </a>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    introFocus,
    finishHome
  }, dispatch)
}

const selector = createSelector(
  state => state['intros'],
  state => state['intro_focus'],
  state => state['move'],
  state => state['dark_mode'],
  state => state['window'],
  state => state['home_finished'],
  state => state['burgerOpen'],
  (
    intros,
    intro_focus,
    move,
    dark_mode,
    window_dimensions,
    home_finished,
    burgerOpen
) => {
    return  {
      intros,
      intro_focus,
      move,
      dark_mode,
      window_dimensions,
      home_finished,
      burgerOpen
    };
  }
);

export default connect(selector, matchDispatchToProps)(Home);
