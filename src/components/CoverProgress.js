import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import '../styles/Concepts.css';

class CoverProgress extends Component {
  coverStyle() {
    const { current_cover_index, dark_mode } = this.props;

    if (dark_mode) {
      switch (current_cover_index) {
        case 0:
        return {
          left: 0,
          backgroundColor: "white"
        }
        case 1:
        return {
          left: "calc(50% - 30px)",
          backgroundColor: "white"
        }
        case 2:
        return {
          left: "calc(100% - 60px)",
          backgroundColor: "white"
        }
      }
    }
    else {
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
  }

  render() {
    return(
      <div className="cover-progress-bar">
        <div
          style={this.coverStyle()}
          className="cover-progress"/>
      </div>
    );
  }
}

const selector = createSelector(
  state => state['dark_mode'],
  (
    dark_mode,
) => {
    return  {
      dark_mode,
    };
  }
);

export default connect(selector)(CoverProgress);
