import React, { Component } from 'react';
import dark_logo from '../img/Logo.png';
import light_logo from '../img/LightLogo.png';
import sun from '../img/Sun.png';
import moon from '../img/Moon.png';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  activateDarkMode,
  skipAllIntros,
} from '../actions/index.js';
import Tab from './Tab.js';
import '../styles/NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destroyedSkip: false
    }
  }

  renderTabs() {
    const { menu_tabs } = this.props;
    return(
      map(
        menu_tabs,
        (tab, index) => <Tab key={index} {...tab} id={index}/>
      )
    );
  }

  sunStyle() {
    const { dark_mode } = this.props;
    if (dark_mode) {
      return {
        width: '50px',
        backgroundColor: 'black'
      }
    }
    else {
      return {
        width: '50px',
        backgroundColor: 'rgba(216,216,216,0.2)'
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { home_finished } = this.props;

    if (home_finished !== prevProps.home_finished) {
      setTimeout(() => {
        this.setState({destroyedSkip: true})
      }, 800);
    }
  }

  navbarStyle() {
    const { concept_open, dark_mode, current_tab, navbar_hidden } = this.props;

    if (dark_mode) {
      if (concept_open) {
        if (current_tab === "concepts") {
          if (navbar_hidden) {
            return {
              transform: "translateY(-125px)",
              boxShadow: "rgba(0,0,0,0.3) 0px 3px 15px",
              backgroundColor: "#262626"
            }
          }
          else {
            return {
              boxShadow: "rgba(0,0,0,0.3) 0px 3px 15px",
              backgroundColor: "#262626"
            }
          }
        }
        else {
          return {
            backgroundColor: "#262626"
          }
        }
      }
      else {
        return {
          backgroundColor: "#262626"
        }
      }
    }
    else {
      if (concept_open) {
        if (current_tab === "concepts") {
          if (navbar_hidden) {
            return {
              transform: "translateY(-125px)",
              boxShadow: "rgba(0,0,0,0.1) 0px 3px 15px"
            }
          }
          else {
            return {
              boxShadow: "rgba(0,0,0,0.1) 0px 3px 15px"
            }
          }
        }
      }
    }
  }

  render() {
    const { dark_mode, home_finished } = this.props;
    const { destroyedSkip } = this.state;
    const dark_mode_icon = dark_mode ? moon : sun;
    const logo = dark_mode ? light_logo : dark_logo;

    return (
      <div
        style={this.navbarStyle()}
        className="navbar">
        <img className="logo" src={logo} alt="logo" />
        <div className="tabs">
          {this.renderTabs()}
          <div
            onClick={() => {
              this.props.activateDarkMode(!dark_mode);
            }}
            style={this.sunStyle()}
            className="tab">
            <img
              style={dark_mode ? {width: '19px'} : {}}
              src={dark_mode_icon} className="sun" alt="sun" />
          </div>
          {!destroyedSkip &&
            <div
              onClick={() => {
                this.props.skipAllIntros();
              }}
              style={home_finished ?
                {
                  width: 0,
                  opacity: 0,
                  transition: "all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)"
                }
                : {width: 90}}
              className="tab">
              <p style={dark_mode ? {color: "white"} : {}}>
                SKIP
              </p>
            </div>
          }
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    activateDarkMode,
    skipAllIntros,
  }, dispatch)
}

const selector = createSelector(
  state => state['intros'],
  state => state['menu_tabs'],
  state => state['dark_mode'],
  state => state['home_finished'],
  state => state['concept_open'],
  state => state['current_tab'],
  state => state['navbar_hidden'],
  (
    intros,
    menu_tabs,
    dark_mode,
    home_finished,
    concept_open,
    current_tab,
    navbar_hidden
) => {
    return  {
      intros,
      menu_tabs,
      dark_mode,
      home_finished,
      concept_open,
      current_tab,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(NavBar);
