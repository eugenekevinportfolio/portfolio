import React, { Component } from 'react';
import InvisibleIntro from './InvisibleIntro.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  finishHome,
  introFocus,
  skipAllIntros
} from '../actions/index.js';
import '../styles/Home.css';

class InvisibleHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // current_intro_index: 0,
      // state_intros: {},
      canPressKey: true
    }
  }

  componentDidUpdate(prevProps) {
    const { home_finished, intros } = this.props;
    const { canPressKey } = this.state;
    const intro_keys = Object.keys(intros);
    const last_intro = intro_keys[intro_keys.length - 1];

    if (home_finished !== prevProps.home_finished) {
      if (canPressKey) {
        this.props.introFocus(last_intro);
        this.setState({
          // state_intros: intros[last_intro],
          // current_intro_index: intro_keys.indexOf(last_intro),
          canPressKey: false
        });
        this.timeout = setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 400);
      }
    }
  }

  pressKey(e) {
    const { intros, intro_focus, home_finished } = this.props;
    const { canPressKey } = this.state;
    const intro_keys = Object.keys(intros);
    const current_intro_index = intro_keys.indexOf(intro_focus);

    if (canPressKey) {
      if ((e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 40) && intros[intro_keys[current_intro_index + 1]]) {
        this.props.introFocus(intro_keys[current_intro_index + 1]);
        this.setState({
          canPressKey: false
        });
        this.timeout = setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 400);
        if ((current_intro_index + 1) === intro_keys.length - 1) {
          !home_finished && this.props.finishHome();
        }
      }
      else if (e.keyCode === 27) {
        this.props.skipAllIntros();
      }
      else if ((e.keyCode === 8 || e.keyCode === 38) && intros[intro_keys[current_intro_index - 1]]) {
        this.props.introFocus(intro_keys[current_intro_index - 1]);
        this.setState({
          canPressKey: false
        });
        this.timeout = setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 400);
      }
    }
  }

  handleScroll(e) {
    const { intros, intro_focus, home_finished } = this.props;
    const { canPressKey } = this.state;
    const intro_keys = Object.keys(intros);
    const current_intro_index = intro_keys.indexOf(intro_focus);

    if (canPressKey) {
      if (e.deltaY > 45 && intros[intro_keys[current_intro_index + 1]]) {
        this.props.introFocus(intro_keys[current_intro_index + 1]);
        this.setState({
          canPressKey: false
        });
        this.timeout = setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 400);
        if ((current_intro_index + 1) === intro_keys.length - 1) {
          !home_finished && this.props.finishHome();
        }
      }
      else if (e.deltaY < -45 && intros[intro_keys[current_intro_index - 1]]) {
        this.props.introFocus(intro_keys[current_intro_index - 1]);
        this.setState({
          canPressKey: false
        });
        this.timeout = setTimeout(() => {
          this.setState({
            canPressKey: true
          })
        }, 400);
      }
    }
  }

  componentDidMount() {
    this.pressKey = this.pressKey.bind(this);
    window.addEventListener("keydown", this.pressKey);
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("wheel", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.pressKey);
    this.pressKey = undefined;
    window.removeEventListener("wheel", this.handleScroll);
    this.handleScroll = undefined;
  }

  renderIntro() {
    const { intros, intro_focus } = this.props;
    const current_intro = intros[intro_focus];
    return(
      <InvisibleIntro intro={current_intro}/>
    );
  }

  render() {
    const { window_dimensions } = this.props;

    return (
      <div
        style={window_dimensions.isDesktop ? {
          opacity: 0,
          position: 'fixed',
          top: 90,
          bottom: 0,
          left: 90,
          right: 0,
        } : {
          opacity: 0,
          position: 'fixed',
          top: 90,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id="home"
        className="home">
        <div
          style={{
            justifyContent: "center"
          }}
          className="home-center">
          {this.renderIntro()}
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    finishHome,
    introFocus,
    skipAllIntros
  }, dispatch)
}

const selector = createSelector(
  state => state['intros'],
  state => state['intro_focus'],
  state => state['home_finished'],
  state => state['window'],
  (
    intros,
    intro_focus,
    home_finished,
    window_dimensions
) => {
    return  {
      intros,
      intro_focus,
      home_finished,
      window_dimensions
    };
  }
);

export default connect(selector, matchDispatchToProps)(InvisibleHome);
