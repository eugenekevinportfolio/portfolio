import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changing: false,
      desync_selected_picture: ''
    }
  }

  componentDidMount() {
    const { selected_picture } = this.props;

    this.setState({
      desync_selected_picture: selected_picture,
    });
  }

  componentDidUpdate(prevProps) {
    const { selected_picture } = this.props;
    if (prevProps.selected_picture !== selected_picture) {
      this.timeout && clearTimeout(this.timeout);
      this.setState({changing: true})
      this.timeout = setTimeout(() => {
        this.setState({
          desync_selected_picture: selected_picture,
          changing: false
        });
      }, 600);
    }
  }

  render() {
    const { dark_mode, carousel, current_set_pictures } = this.props;
    const { desync_selected_picture, changing } = this.state;
    return (
      <div
        style={changing ? {opacity:0} : {}}
        ref={(timer) => this.timer = timer}
        className="timer">
        <div className="above-timer">
          <h1
            style={dark_mode ? {color: "white"} : {}}
            className="picture-name">
            {current_set_pictures[desync_selected_picture] && current_set_pictures[desync_selected_picture].title.toUpperCase()}
          </h1>
          <p
            style={dark_mode ? {color: "white"} : {}}
            className="picture-location">
            {current_set_pictures[desync_selected_picture] && current_set_pictures[desync_selected_picture].location.toUpperCase()}
          </p>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_picture'],
  state => state['selected_moment'],
  state => state['timers_scroll'],
  state => state['carousel'],
  state => state['dark_mode'],
  (
    selected_picture,
    selected_moment,
    timers_scroll,
    carousel,
    dark_mode
) => {
    return  {
      selected_picture,
      selected_moment,
      timers_scroll,
      carousel,
      dark_mode
    };
  }
);

export default connect(selector, matchDispatchToProps)(Timer);
