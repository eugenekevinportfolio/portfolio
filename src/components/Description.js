import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changing: false,
      differed_selected_picture: ''
    }
  }

  componentDidMount() {
    const { selected_picture } = this.props;

    this.setState({
      differed_selected_picture: selected_picture,
    });
  }

  componentDidUpdate(prevProps) {
    const { selected_picture } = this.props;
    if (prevProps.selected_picture !== selected_picture) {
      this.setState({changing: true})
      setTimeout(() => {
        this.setState({
          differed_selected_picture: selected_picture,
          changing: false
        });
      }, 500);
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
    const { differed_selected_picture } = this.state;
    return (
      <div
        style={this.picturesPartStyle()}
        className="lower-low-pictures">
        <div
          className="description"
          style={this.descriptionStyle()}>
          {current_set_pictures[differed_selected_picture] && current_set_pictures[differed_selected_picture].description}
        </div>
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
