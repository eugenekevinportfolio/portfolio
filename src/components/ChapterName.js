import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import {
  storePosition,
  moveSelector,
  selectChapter
} from '../actions/index.js';

class ChapterName extends Component {
  componentDidUpdate(prevProps) {
    const { id, concept_open } = this.props;
    if (!prevProps.concept_open && concept_open) {
      const position = this.chapter_name.getBoundingClientRect().top;
      this.props.storePosition(id, position);
      id === "intro" && this.props.moveSelector(position);
    }
  }

  chapterNameStyle() {
    const { id, current_chapter } = this.props;

    if (id === current_chapter) {
      return {
        opacity: 1
      }
    }
  }

  render() {
    const { name, id, position, window_dimensions } = this.props;
    return (
      <p
        onClick={() => {
          this.props.selectChapter(id);
          this.props.moveSelector(position);
          const partToScrollTo = document.getElementById(id);
          if (partToScrollTo.getBoundingClientRect().top !== 135) {
            partToScrollTo.scrollIntoView();
            document.documentElement.scrollTop -= 135;
            // Optimization for videos and universal_messages
            const content = document.getElementsByClassName("video-container");
            for (let i = 0; i < content.length; i++) {
              if (content[i].getBoundingClientRect().bottom < 0 || content[i].getBoundingClientRect().top > window_dimensions.height) {
                // content[i].style.visibility = "hidden";
                if (content[i].children[0].children[0].nodeName === "VIDEO") {
                  content[i].children[0].children[0].pause();
                }
              }
              else {
                // content[i].style.visibility = "";
                if (content[i].children[0].children[0].nodeName === "VIDEO") {
                  content[i].children[0].children[0].play();
                }
              }
            }
          }
        }}
        ref={(element) => this.chapter_name = element}
        style={this.chapterNameStyle()}>
        {name}
      </p>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    storePosition,
    selectChapter,
    moveSelector
  }, dispatch)
}

const selector = createSelector(
  state => state['window'],
  state => state['dark_mode'],
  state => state['current_chapter'],
  state => state['concept_open'],
  (
    window_dimensions,
    dark_mode,
    current_chapter,
    concept_open
) => {
    return  {
      window_dimensions,
      dark_mode,
      current_chapter,
      concept_open
    };
  }
);

export default connect(selector, matchDispatchToProps)(ChapterName);
