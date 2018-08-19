import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Burger extends Component {
  topStyle(open) {
    const { dark_mode } = this.props;

    if (dark_mode) {
      if (open) {
        return {
          transform: 'rotate(-112deg)',
          top: 5,
          backgroundColor: "black"
        }
      }
      else {
        return {
          backgroundColor: "white"
        }
      }
    }
    else {
      if (open) {
        return {
          transform: 'rotate(-112deg)',
          top: 5,
          backgroundColor: "white"
        }
      }
    }
  }

  bottomStyle(open) {
    const { dark_mode } = this.props;

    if (dark_mode) {
      if (open) {
        return {
          transform: 'rotate(112deg)',
          top: -5,
          width: "100%",
          backgroundColor: "black"
        }
      }
      else {
        return {
          backgroundColor: "white"
        }
      }
    }
    else {
      if (open) {
        return {
          transform: 'rotate(112deg)',
          top: -5,
          width: "100%",
          backgroundColor: "white"
        }
      }
    }
  }

  render() {
    const { open } = this.props;

    return (
      <div
        className="burger">
        <div
          style={this.topStyle(open)}
          className="top-burger">
        </div>
        <div
          style={this.bottomStyle(open)}
          className="bottom-burger">
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

export default connect(selector)(Burger);
