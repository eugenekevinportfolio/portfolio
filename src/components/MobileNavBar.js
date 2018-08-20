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
  openBurger
} from '../actions/index.js';
import MobileTab from './MobileTab.js';
import Burger from './Burger.js';
import '../styles/NavBar.css';

class MobileNavBar extends Component {
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
        (tab, index) => <MobileTab key={index} {...tab} id={index}/>
      )
    );
  }

  componentDidUpdate(prevProps) {
    const { home_finished } = this.props;

    if (home_finished !== prevProps.home_finished) {
      setTimeout(() => {
        this.setState({destroyedSkip: true})
      }, 600);
    }
  }

  burgerContainerStyle() {
    const { dark_mode, home_finished, burgerOpen } = this.props;
    if (dark_mode) {
      if (home_finished) {
        if (burgerOpen) {
          return {
            // borderLeft: 'solid 1px rgba(255,255,255,0.2)',
            backgroundColor: "white"
          }
        }
        else {
          return {
            // borderLeft: 'solid 1px rgba(255,255,255,0.2)',
          }
        }
      }
      else {
        return {
          opacity: 0,
          width: 0,
          position: "absolute",
          pointerEvents: "none"
        }
      }
    }
    else {
      if (home_finished) {
        if (burgerOpen) {
          return {
            backgroundColor: 'black'
          }
        }
      }
      else {
        return {
          opacity: 0,
          width: 0,
          position: "absolute",
          pointerEvents: "none"
        }
      }
    }
  }

  renderMobileTabs() {
    const { menu_tabs, burgerOpen } = this.props;
    return(
      map(
        menu_tabs,
        (tab, index) => <MobileTab key={index} {...tab} id={index} open={burgerOpen}/>
      )
    );
  }

  // mobileTabStyle(open) {
  //   const { dark_mode } = this.props;
  //
  //   if (dark_mode) {
  //     if (open) {
  //       return {
  //         opacity: 1,
  //         top: 0,
  //         transitionDelay: 4 * 0.08 + "s",
  //         transform: "scale(1)",
  //         backgroundColor: "black",
  //         color: "white",
  //         // borderBottom: 'solid 1px rgba(255,255,255,0.2)'
  //       }
  //     }
  //   }
  //   else {
  //     if (open) {
  //       return {
  //         opacity: 1,
  //         top: 0,
  //         transitionDelay: 4 * 0.08 + "s",
  //         transform: "scale(1)"
  //       }
  //     }
  //   }
  // }

  sunStyle() {
    const { dark_mode } = this.props;
    if (dark_mode) {
      return {
        width: '70px',
        backgroundColor: 'black'
      }
    }
    else {
      return {
        width: '70px',
        backgroundColor: 'rgba(216,216,216,0.2)'
      }
    }
  }

  backdropStyle(open) {
    const { dark_mode } = this.props;

    if (dark_mode) {
      if (open) {
        return {
          opacity: 1,
          pointerEvents: "auto",
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
      if (open) {
        return {
          opacity: 1,
          pointerEvents: "auto"
        }
      }
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
    const { dark_mode, home_finished, burgerOpen } = this.props;
    const { destroyedSkip } = this.state;
    const logo = dark_mode ? light_logo : dark_logo;
    const dark_mode_icon = dark_mode ? moon : sun;
    return (
      <div
        // style={dark_mode ? {borderBottom: 'solid 1px rgba(255,255,255,0.2)'} : {}}
        style={this.navbarStyle()}
        className="navbar">
        <div
          className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          <p style={dark_mode ? {color: "white"} : {}}>
            Kevin Eugene
          </p>
        </div>
        {/* <div className="tabs">
          {this.renderTabs()}
          <div
            style={{width: '50px'}}
            className="tab">
            <img src={sun} className="sun" alt="sun" />
          </div>
        </div> */}
        <div className="tabs">
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
          <div
            onClick={() => this.props.openBurger(!burgerOpen)}
            style={this.burgerContainerStyle()}
            className="burger-container">
            <Burger open={burgerOpen} />
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
                  transition: "all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)"
                }
                : {width: 75}}
              className="tab">
              <p style={dark_mode ? {color: "white"} : {}}>
                SKIP
              </p>
            </div>
          }
        </div>
        <div
          onClick={() => this.props.openBurger(false)}
          style={this.backdropStyle(burgerOpen)}
          className="backdrop">
          {this.renderMobileTabs()}
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    activateDarkMode,
    openBurger,
    skipAllIntros
  }, dispatch)
}

const selector = createSelector(
  state => state['menu_tabs'],
  state => state['dark_mode'],
  state => state['home_finished'],
  state => state['burgerOpen'],
  state => state['concept_open'],
  state => state['current_tab'],
  state => state['navbar_hidden'],
  (
    menu_tabs,
    dark_mode,
    home_finished,
    burgerOpen,
    concept_open,
    current_tab,
    navbar_hidden
) => {
    return  {
      menu_tabs,
      dark_mode,
      home_finished,
      burgerOpen,
      concept_open,
      current_tab,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileNavBar);
