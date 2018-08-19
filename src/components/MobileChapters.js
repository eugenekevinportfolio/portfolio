import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import ChapterName from './ChapterName.js';
import {
  openConcept,
  hideNavbar,
  openBottom
} from '../actions/index.js';
import dark_back_down from '../img/Back_Down.png';
import light_back_down from '../img/Light_Back_Down.png';

class MobileChapters extends Component {
  constructor(props) {
    super(props);
  }

  renderMobileChapterNames() {
    const { chapters } = this.props;

    return(
      map(
        chapters,
        (chapter, id) => <ChapterName key={id} {...chapter} id={id}/>
      )
    );
  }

  selectorStyle() {

  }

  // chaptersContentStyle() {
  //   const { dark_mode } = this.props;
  //
  //   if (dark_mode) {
  //     return {
  //       color: "white"
  //     }
  //   }
  // }

  backdownStyle() {
    const { dark_mode } = this.props;

    if (dark_mode) {
      return {
        opacity: 1,
        borderColor: "white",
        backgroundColor: "#262626"
      }
    }
  }

  bottomStyle() {
    const { bottom_open } = this.props;

    if (bottom_open) {
      return {
        height: 200
      }
    }
  }

  render() {
    const { dark_mode, navbar_hidden } = this.props;
    const back_down = dark_mode ? light_back_down : dark_back_down;

    return (
      <div
        style={this.bottomStyle()}
        className="bottom-article">
        <div
          onClick={() => {
            this.props.openConcept(false);
            navbar_hidden && this.props.hideNavbar(false);
          }}
          style={this.backdownStyle()}
          className="mobile-back-down-button">
          <img src={back_down} className="back-down-img" />
        </div>
        <div
          onClick={() => this.props.openBottom(true)}
          className="mobile-chapters">
          <div
            style={this.selectorStyle()}
            className="mobile-chapter-selector"/>
            <p>
              Hey
            </p>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openConcept,
    hideNavbar,
    openBottom
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['selector_position'],
  state => state['chapters'],
  state => state['navbar_hidden'],
  state => state['bottom_open'],
  (
    dark_mode,
    selector_position,
    chapters,
    navbar_hidden,
    bottom_open
) => {
    return  {
      dark_mode,
      selector_position,
      chapters,
      navbar_hidden,
      bottom_open
    };
  }
);

export default connect(selector, matchDispatchToProps)(MobileChapters);
