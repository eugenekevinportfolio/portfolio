import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  selectTab,
  updateCentralPosition,
  introFocus
} from '../actions/index.js';

class InvisibleIntro extends Component {
  componentDidMount() {
    const { intro_focus } = this.props;
    const central_position = this.introContainer.getBoundingClientRect().top;
    this.props.updateCentralPosition(intro_focus, central_position);
  }

  componentDidUpdate(prevProps) {
    const { intro_focus, intros } = this.props;
    const central_position = this.introContainer.getBoundingClientRect().top;
    if (prevProps.intro_focus !== intro_focus || central_position !== intros[intro_focus].central_position) {
      this.props.updateCentralPosition(intro_focus, central_position);
    }
  }

  render() {
    const { text } = this.props.intro;
    return (
      <p
        ref={(intro) => { this.introContainer = intro; }}>
        {text}
      </p>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab,
    updateCentralPosition,
    introFocus
  }, dispatch)
}

const selector = createSelector(
  state => state['intro_focus'],
  state => state['intros'],
  (
    intro_focus,
    intros
) => {
    return  {
      intro_focus,
      intros
    };
  }
);

export default connect(selector, matchDispatchToProps)(InvisibleIntro);
