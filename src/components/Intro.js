import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  selectTab,
  updateCentralPosition,
  moveTop
} from '../actions/index.js';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canMove: true
    }
  }

  componentDidUpdate(prevProps) {
    const { id, central_position, intro_focus } = this.props;
    const { canMove } = this.state;
    const current_position = this.introElement.getBoundingClientRect().top;
    const moveTopValue = current_position - central_position;
    // Fix bug movetop summoned twice
    // Quick partial fix
    if (central_position!==0 && moveTopValue !== 0 && id === intro_focus && canMove) {
      this.props.moveTop(moveTopValue);
      this.setState({canMove: false})
      this.timeout = setTimeout(() => {
        this.setState({canMove: true});
      }, 500)
    }
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  introStyle() {
    const { intro_focus, id, has_focused, dark_mode } = this.props;
    if (dark_mode) {
      if (intro_focus === id) {
        return {
          opacity: 1,
          color: "white"
        }
      }
      else if (has_focused) {
        return {
          opacity: 0.1,
          color: "white"
        }
      }
    }
    else {
      if (intro_focus === id) {
        return {
          opacity: 1
        }
      }
      else if (has_focused) {
        return {
          opacity: 0.1
        }
      }
    }
  }

  introColor() {
    const { dark_mode } = this.props;
    if (dark_mode) {
      return {
        color: 'white'
      }
    }
  }

  render() {
    const { text } = this.props;
    return (
      <p
        ref={(intro) => { this.introElement = intro; }}
        style={this.introStyle()}
        >
        {text}
      </p>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab,
    updateCentralPosition,
    moveTop
  }, dispatch)
}

const selector = createSelector(
  state => state['intro_focus'],
  state => state['dark_mode'],
  (
    intro_focus,
    dark_mode
) => {
    return  {
      intro_focus,
      dark_mode
    };
  }
);

export default connect(selector, matchDispatchToProps)(Intro);
