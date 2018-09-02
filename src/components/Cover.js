import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import '../styles/Concepts.css';

class Cover extends Component {
  coverStyle() {
    const { selected_cover, id } = this.props;

    if (id === selected_cover) {
      return {
        opacity: 1
      }
    }
    else {
      return {
        opacity: 0.2
      }
    }
  }

  render() {
    const { date, title, description, dark_mode, current_cover, id } = this.props;

    return (
      <div
        id={id === "youtube" && "last-cover"}
        style={this.coverStyle()}
        className="cover">
        <div className = "cover-content">
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
  state => state['selected_cover'],
  (
    dark_mode,
    selected_cover
) => {
    return  {
      dark_mode,
      selected_cover
    };
  }
);

export default connect(selector)(Cover);
