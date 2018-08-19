import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import '../styles/Blog.css';

class MobileBlog extends Component {
  render() {
    const { dark_mode } = this.props;

    return (
      <div className="blog">
        <p style={dark_mode ? {color: "white"} : {}}>
          Unfortunately, the blog is not mobile responsive yet, but it will be in a near future! :) Switch to the desktop if you want to enjoy it.
        </p>
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

export default connect(selector)(MobileBlog);
