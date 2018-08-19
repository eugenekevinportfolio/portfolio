import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import '../styles/Concepts.css';

class Cover extends Component {
  coverStyle() {
    const { dark_mode, order } = this.props;

    if (dark_mode) {
      return {
        left: order*100 + '%',
        backgroundColor: "#262626"
      }
    }
    else {
      return {
        left: order*100 + '%'
      }
    }
  }

  render() {
    const { date, title, description, dark_mode, current_cover, id } = this.props;

    return (
      <div
        style={this.coverStyle()}
        className="cover">
        <div
          style={id !== current_cover ? {
            transform: "scale(0.6)",
            opacity: 0
          } : {}}
          className = "cover-content">
          <p
            style={dark_mode ? {
              color: "white"
            } : {}}
            className="cover-date">
            {date.toUpperCase()}
          </p>
          <p
            style={dark_mode ? {
              color: "white"
            } : {}}
            className="cover-title">
            {title}
          </p>
          <p
            style={dark_mode ? {
              color: "white"
            } : {}}
            className="cover-description">
            {description}
          </p>
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  state => state['dark_mode'],
  (
    dark_mode
) => {
    return  {
      dark_mode
    };
  }
);

export default connect(selector)(Cover);
