import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Description extends Component {
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

  picturesPartStyle() {
    const { isOpen } = this.props;

    if (isOpen) {
      return {
        opacity: 1
      }
    }
    else {
      return {
        transitionDelay: "0s",
        transitionDuration: "0.25s"
      }
    }
  }

  descriptionStyle() {
    const { changing } = this.state;
    const { dark_mode } = this.props;

    if (dark_mode) {
      if (changing) {
        return {
          opacity: 0,
          color: "white"
        }
      }
      else {
        return {
          color: "white"
        }
      }
    }
    else {
      if (changing) {
        return {
          opacity: 0
        }
      }
    }
  }

  render() {
    const { current_set_pictures } = this.props;
    const { desync_selected_picture, changing } = this.state;
    return (
      <div
        style={this.descriptionStyle()}
        className="description">
        {current_set_pictures[desync_selected_picture] && current_set_pictures[desync_selected_picture].description}
      </div>
    );
  }
}

const selector = createSelector(
  state => state['selected_picture'],
  state => state['dark_mode'],
  state => state['carousel'].isOpen,
  (
    selected_picture,
    dark_mode,
    isOpen
) => {
    return  {
      selected_picture,
      dark_mode,
      isOpen
    };
  }
);

export default connect(selector)(Description);
