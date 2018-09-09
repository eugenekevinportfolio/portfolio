import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import ChapterName from './ChapterName.js';
import { transparentArticle } from '../actions/index.js';

class Chapters extends Component {
  renderChapterNames() {
    const { chapters, selected_cover } = this.props;

    return(
      map(
        chapters[selected_cover],
        (chapter, id) => <ChapterName key={id} {...chapter} id={id}/>
      )
    );
  }

  selectorStyle() {
    const { selector_position, dark_mode } = this.props;

    if (dark_mode) {
      return {
        top: selector_position + 4,
        backgroundColor: "white"
      }
    }
    else {
      return {
        top: selector_position + 4
      }
    }
  }

  chaptersContentStyle() {
    const { dark_mode } = this.props;

    if (dark_mode) {
      return {
        color: "white"
      }
    }
  }

  render() {
    const { covers, selected_cover } = this.props;
    return (
      <div
        onMouseEnter={() => this.props.transparentArticle(true)}
        onMouseLeave={() => this.props.transparentArticle(false)}
        className="chapters">
        <div
          style={this.selectorStyle()}
          className="chapter-selector"/>
        <div
          style={this.chaptersContentStyle()}
          className="chapters-content">
          <p className="title">
            {covers[selected_cover].title}
          </p>
          {/* <div>
            <img src={facebook} className="share-icon" alt="Facebook" />
            <img src={twitter} className="share-icon" alt="Twitter" />
            <img src={mail} className="share-icon" alt="Mail" />
            <img src={copy} className="share-icon" alt="Copy" />
          </div> */}
          <div className="chapter-names">
            {this.renderChapterNames()}
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    transparentArticle
  }, dispatch)
}

const selector = createSelector(
  state => state['dark_mode'],
  state => state['selector_position'],
  state => state['chapters'],
  state => state['covers'],
  state => state['selected_cover'],
  (
    dark_mode,
    selector_position,
    chapters,
    covers,
    selected_cover
) => {
    return  {
      dark_mode,
      selector_position,
      chapters,
      covers,
      selected_cover
    };
  }
);

export default connect(selector, matchDispatchToProps)(Chapters);
