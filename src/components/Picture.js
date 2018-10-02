import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  selectPicture,
  enterCarousel,
  fullScreenImage
} from '../actions/index.js';
import '../styles/Pictures.css';

class Picture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updating_picture: false,
      moved_picture: false,
      differed_img: ''
    }
  }

  componentDidMount() {
    const { src } = this.props;
    this.setState({
      updating_picture: true,
      moved_picture: true,
      differed_img: src
    });
    setTimeout(() => {
      this.setState({
        moved_picture: false,
        updating_picture: false
      });
    }, 10)
  }

  componentDidUpdate(prevProps) {
    const { selected_moment } = this.props;

    // When the carousel is closed, trigger animation to load new images when moment is changed
    if (prevProps.selected_moment !== selected_moment) {
      this.setState({updating_picture: true});
    }
  }

  pictureStyle() {
    const { carousel, id, selected_picture, current_set_pictures_ids, window_dimensions } = this.props;
    const { updating_picture, moved_picture } = this.state;
    const id_number = current_set_pictures_ids.indexOf(id);
    const last_id = current_set_pictures_ids[current_set_pictures_ids.length - 1];
    const margin_right = window_dimensions.isDesktop ? 970 : 1229;

    if (carousel.isOpen) {
      if (id === last_id) {
        if (id === selected_picture) {
          return {
            opacity: 1,
            transitionDuration: 0.8 + "s",
            marginRight: margin_right
          }
        }
        else {
          return {
            marginRight: margin_right
          }
        }
      }
      else {
        if (id === selected_picture) {
          return {
            opacity: 1,
            transitionDuration: 0.8 + "s",
          }
        }
      }
    }
    else {
      if (updating_picture && !moved_picture) {
        return {
          opacity: 0,
        }
      }
      else if (updating_picture && moved_picture) {
        return {
          opacity: 0,
          transform: "translateY(-75px)"
        }
      }
      else if (!updating_picture) {
        return {
          transitionDelay: id_number * 0.1 + "s",
          opacity: 0.2
        }
      }
    }
  }

  render() {
    const { differed_img } = this.state;
    const { id, carousel, selected_picture, current_set_pictures_ids } = this.props;
    return (
      <div
        // onClick={() => {
        //   if (carousel.isOpen && id !== selected_picture) {
        //     this.props.selectPicture(id);
        //   }
        //   else if (carousel.isOpen && id === selected_picture) {
        //     this.props.fullScreenImage(differed_img, true);
        //     this.props.autoPlay(false);
        //   }
        //   else if (!carousel.isOpen) {
        //     this.props.autoPlay(true);
        //     this.props.enterCarousel(true);
        //     setTimeout(() => {
        //       this.props.selectPicture(current_set_pictures_ids[0])
        //     }, 700)
        //   }
        // }}
        ref={(picture) => this.picture = picture}
        className="picture"
        style={this.pictureStyle()}
        >
        <img src={differed_img} />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPicture,
    enterCarousel,
    fullScreenImage
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_moment'],
  state => state['carousel'],
  state => state['selected_picture'],
  state => state['pictures_scroll'],
  state => state['window'],
  (
    selected_moment,
    carousel,
    selected_picture,
    pictures_scroll,
    window_dimensions
) => {
    return  {
      selected_moment,
      carousel,
      selected_picture,
      pictures_scroll,
      window_dimensions
    };
  }
);

export default connect(selector, matchDispatchToProps)(Picture);
