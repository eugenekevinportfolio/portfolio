import React, { Component } from 'react';
import map from 'lodash/map';
import Cover from './Cover.js';
import CoverProgress from './CoverProgress.js';
import CoverLinks from './CoverLinks.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import {
  moveCoversToLeft,
  moveCoversToRight,
  openConcept,
  hideNavbar
} from '../actions/index.js';
import dark_left_arrow from '../img/LeftArrow.png';
import dark_right_arrow from '../img/RightArrow.png';
import light_left_arrow from '../img/LightLeftArrow.png';
import light_right_arrow from '../img/LightRightArrow.png';


class Concepts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_current_cover: ""
    }
  }

  componentWillMount() {
    const { covers } = this.props;
    let current_cover = "";
    for (let key in covers) {
      if (current_cover === "") {
        if (covers[key].order === 0) {
          current_cover = key;
        }
      }
    }
    this.setState({desync_current_cover: current_cover});
  }

  componentDidMount() {
    this.pressKey = this.pressKey.bind(this);
    window.addEventListener("keydown", this.pressKey);
  }

  componentDidUpdate(prevProps) {
    const current_covers = this.props.covers;
    const prev_covers = prevProps.covers;

    let current_selected_cover = "";
    for (let key in current_covers) {
      if (current_selected_cover === "") {
        if (current_covers[key].order === 0) {
          current_selected_cover = key;
        }
      }
    }

    let prev_selected_cover = "";
    for (let key in prev_covers) {
      if (prev_selected_cover === "") {
        if (prev_covers[key].order === 0) {
          prev_selected_cover = key;
        }
      }
    }


    if (current_selected_cover !== prev_selected_cover) {
      setTimeout(() => {
        this.setState({desync_current_cover: current_selected_cover});
      }, 400);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.pressKey);
    this.pressKey = undefined;
  }

  pressKey(e) {
    const { covers, burgerOpen, concept_open, navbar_hidden } = this.props;
    const cover_keys = Object.keys(covers);
    let current_cover = "";
    for (let key in covers) {
      if (current_cover === "") {
        if (covers[key].order === 0) {
          current_cover = key;
        }
      }
    }
    const current_cover_index = cover_keys.indexOf(current_cover);

    if (!concept_open) {
      if (e.keyCode === 39) {
        if (current_cover_index < cover_keys.length - 1 && !burgerOpen) {
          this.props.moveCoversToLeft()
        }
      }
      else if (e.keyCode === 37) {
        if (current_cover_index > 0 && !burgerOpen) {
          this.props.moveCoversToRight()
        }
      }
      else if (e.keyCode === 13 || e.keyCode === 40) {
        this.props.openConcept(true);
      }
    }
    else {
      if (e.keyCode === 27) {
        this.props.openConcept(false);
        navbar_hidden && this.props.hideNavbar(false);
      }
    }
  }

  renderCovers(current_cover) {
    const { covers } = this.props;

    return(
      map(
        covers,
        (cover, index) => <Cover key={index} id={index} {...cover} current_cover={current_cover}/>
      )
    );
  }

  arrowStyle(type, current_cover_index, cover_keys) {
    const { burgerOpen } = this.props;

    if (!burgerOpen) {
      if (type === "left") {
        if (current_cover_index === 0) {
          return {
            opacity: 0.2,
            cursor: "default"
          }
        }
      }
      else if (type === "right") {
        if (current_cover_index === cover_keys.length - 1) {
          return {
            opacity: 0.2,
            cursor: "default"
          }
        }
      }
    }
    else {
      return {
        opacity: 0,
        cursor: "default"
      }
    }
  }

  conceptStyle() {
    const { concept_open } = this.props;

    if (concept_open) {
      return {
        transform: "translateY(-120%)",
        transitionDelay: "0.1s"
      }
    }
  }

  render() {
    const { covers, dark_mode, burgerOpen } = this.props;
    const { desync_current_cover } = this.state;
    const cover_keys = Object.keys(covers);
    let current_cover = "";
    for (let key in covers) {
      if (current_cover === "") {
        if (covers[key].order === 0) {
          current_cover = key;
        }
      }
    }
    const current_cover_index = cover_keys.indexOf(current_cover);
    const left_arrow = dark_mode ? light_left_arrow : dark_left_arrow;
    const right_arrow = dark_mode ? light_right_arrow : dark_right_arrow;

    return (
      <div
        style={this.conceptStyle()}
        className="concepts">
        <img
          id="left-arrow"
          style={this.arrowStyle("left", current_cover_index, cover_keys)}
          onClick= {() => {
            if (current_cover_index > 0 && !burgerOpen) {
              this.props.moveCoversToRight()
            }
          }}
          src={left_arrow}
          className="horizontal-arrow" />
        <img
          id="right-arrow"
          style={this.arrowStyle("right", current_cover_index, cover_keys)}
          onClick= {() => {
            if (current_cover_index < cover_keys.length - 1 && !burgerOpen) {
              this.props.moveCoversToLeft()
            }
          }}
          src={right_arrow}
          className="horizontal-arrow" />
          {this.renderCovers(current_cover)}
          <CoverLinks current_cover={current_cover} desync_current_cover={desync_current_cover}/>
          <CoverProgress current_cover_index={current_cover_index} />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    moveCoversToLeft,
    moveCoversToRight,
    openConcept,
    hideNavbar
  }, dispatch)
}

const selector = createSelector(
  state => state['covers'],
  state => state['dark_mode'],
  state => state['burgerOpen'],
  state => state['concept_open'],
  state => state['navbar_hidden'],
  (
    covers,
    dark_mode,
    burgerOpen,
    concept_open,
    navbar_hidden
) => {
    return  {
      covers,
      dark_mode,
      burgerOpen,
      concept_open,
      navbar_hidden
    };
  }
);

export default connect(selector, matchDispatchToProps)(Concepts);
