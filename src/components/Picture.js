import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  movePictures,
  selectPicture,
  enterCarousel,
  autoPlay,
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
    const { id, selected_picture, pictures_scroll, selected_moment } = this.props;
    const picture_left = this.picture.getBoundingClientRect().left;
    // Move pictures inside the carousel
    if (prevProps.selected_picture !== selected_picture) {
      if (id === selected_picture) {
        this.props.movePictures(pictures_scroll.pictures_left - picture_left);
      }
    }

    // When the carousel is closed, trigger animation to load new images when moment is changed
    if (prevProps.selected_moment !== selected_moment) {
      this.setState({updating_picture: true});
    }
  }

  pictureStyle() {
    const { carousel, id, selected_picture, current_set_pictures_ids } = this.props;
    const { updating_picture, moved_picture } = this.state;
    let id_number = current_set_pictures_ids.indexOf(id);

    if (carousel.isOpen) {
      if (id === selected_picture) {
        return {
          opacity: 1,
          transitionDuration: 0.8 + "s",
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
          top: -80
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
        onClick={() => {
          if (carousel.isOpen && id !== selected_picture) {
            this.props.selectPicture(id);
          }
          else if (carousel.isOpen && id === selected_picture) {
            this.props.fullScreenImage(differed_img, true);
            this.props.autoPlay(false);
          }
          else if (!carousel.isOpen) {
            this.props.autoPlay(true);
            this.props.enterCarousel(true);
            setTimeout(() => {
              this.props.selectPicture(current_set_pictures_ids[0])
            }, 700)
          }
        }}
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
    movePictures,
    selectPicture,
    enterCarousel,
    autoPlay,
    fullScreenImage
  }, dispatch)
}

const selector = createSelector(
  state => state['selected_moment'],
  state => state['carousel'],
  state => state['selected_picture'],
  state => state['pictures_scroll'],
  (
    selected_moment,
    carousel,
    selected_picture,
    pictures_scroll
) => {
    return  {
      selected_moment,
      carousel,
      selected_picture,
      pictures_scroll
    };
  }
);

export default connect(selector, matchDispatchToProps)(Picture);
