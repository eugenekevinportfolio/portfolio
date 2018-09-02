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
  selectCover,
  openConcept,
  hideNavbar
} from '../actions/index.js';
import dark_left_arrow from '../img/LeftArrow.png';
import dark_right_arrow from '../img/RightArrow.png';
import light_left_arrow from '../img/LightLeftArrow.png';
import light_right_arrow from '../img/LightRightArrow.png';
import light_medium_img from '../img/Medium.png';
import light_reddit_img from '../img/Reddit.png';
import dark_medium_img from '../img/DarkMedium.png';
import dark_reddit_img from '../img/DarkReddit.png';
import dark_down_arrow from '../img/DownArrow.png';
import light_down_arrow from '../img/LightDownArrow.png';


class Concepts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_current_cover: "",
      transitioning: false
    }
  }

  componentWillMount() {
    const { selected_cover } = this.props;
    this.setState({desync_current_cover: selected_cover});
  }

  componentDidMount() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("wheel", this.handleScroll);
    window.addEventListener("touchmove", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { selected_cover } = this.props;

    if (prevProps.selected_cover !== selected_cover) {
      this.desync_timeout && clearTimeout(this.desync_timeout);
      this.transition_timeout && clearTimeout(this.transition_timeout);
      this.setState({transitioning: true})
      this.desync_timeout = setTimeout(() => {
        this.setState({
          desync_current_cover: selected_cover,
        });
      }, 400);
      this.transition_timeout = setTimeout(() => {
        this.setState({
          transitioning: false
        });
      }, 700);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
    window.removeEventListener("touchmove", this.handleScroll);
    this.handleScroll = undefined;
  }

  handleScroll() {
    const { window_dimensions, covers, selected_cover } = this.props;
    const page_center = window_dimensions.width / 2;
    const covers_array = document.getElementsByClassName("cover");
    const covers_center = [];
    for (let i = 0; i < covers_array.length; i++) {
      covers_center[i] = (covers_array[i].getBoundingClientRect().left + covers_array[i].getBoundingClientRect().right)/2
    }
    const distance_to_center = [];
    for (let i = 0; i < covers_center.length; i++) {
      distance_to_center[i] = Math.abs(covers_center[i] - page_center);
    }
    const minimum_distance = Math.min(...distance_to_center);
    const index_of_min = distance_to_center.indexOf(minimum_distance);
    const id_to_focus = Object.keys(covers)[index_of_min];
    id_to_focus !== selected_cover && this.props.selectCover(id_to_focus);
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

  conceptStyle() {
    const { concept_open, dark_mode } = this.props;

    if (dark_mode) {
      if (concept_open) {
        return {
          transform: "translateY(-120%)",
          transitionDelay: "0.1s",
          backgroundColor: "#262626"
        }
      }
      else {
        return {
          backgroundColor: "#262626"
        }
      }
    }
    else {
      if (concept_open) {
        return {
          transform: "translateY(-120%)",
          transitionDelay: "0.1s"
        }
      }
    }
  }

  linksStyle(reddit) {
    const { transitioning } = this.state;
    if (transitioning) {
      if (reddit) {
        return {
          left: "calc(50% - 55px)",
          pointerEvents: "none",
          cursor: "default",
          opacity: 0
        }
      }
      else {
        return {
          left: "calc(50% - 25px)",
          pointerEvents: "none",
          cursor: "default",
          opacity: 0
        }
      }
    }
    else {
      if (reddit) {
        return {
          left: "calc(50% - 55px)"
        }
      }
      else {
        return {
          left: "calc(50% - 25px)"
        }
      }
    }
  }

  scrollStyle(ready) {
    const { transitioning } = this.state;
    if (transitioning) {
      if (ready) {
        return {
          left: "calc(50% - 62.14px)",
          pointerEvents: "none",
          cursor: "default",
          opacity: 0
        }
      }
      else {
        return {
          pointerEvents: "none",
          cursor: "default",
          opacity: 0,
          left: "calc(50% - 78.865px)"
        }
      }
    }
    else {
      if (ready) {
        return {
          left: "calc(50% - 62.14px)"
        }
      }
      else {
        return {
          pointerEvents: "none",
          cursor: "default",
          opacity: 0.3,
          left: "calc(50% - 78.865px)"
        }
      }
    }
  }

  render() {
    const { covers, dark_mode, burgerOpen } = this.props;
    const { desync_current_cover } = this.state;
    const medium = covers[desync_current_cover].medium;
    const reddit = covers[desync_current_cover].reddit;
    const ready = covers[desync_current_cover].ready;
    const medium_img = dark_mode ? dark_medium_img : light_medium_img;
    const reddit_img = dark_mode ? dark_reddit_img : light_reddit_img;
    const down_arrow = dark_mode ? light_down_arrow : dark_down_arrow;
    const case_study_text = ready ? "Read case study" : "Story unavailable yet";

    return (
      <div
        style={this.conceptStyle()}
        className="concepts">
        <div className="concepts-horizontal-scroll">
          {this.renderCovers()}
        </div>
        <div
          style={dark_mode ? {backgroundColor: "white"} : {}}
          className="concept-selector"/>
        <div
          style={this.linksStyle(reddit)}
          className="cover-links">
          <a
            href={medium}
            target="_blank">
            <img
              id="medium"
              className="cover-img"
              src={medium_img} />
          </a>
          {reddit &&
            <a
              href={reddit}
              target="_blank">
              <img
                className="cover-img"
                src={reddit_img} />
            </a>
          }
        </div>
        <div
          onClick={() => {
            this.props.openConcept(true);
          }}
          style={this.scrollStyle(ready)}
          className="scroll-bottom">
          <p style={dark_mode ? {color: "white"} : {}}>
            {case_study_text}
          </p>
          {ready && <img className="arrow" src={down_arrow}/>}
        </div>
        {/* <img
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
          <CoverProgress current_cover_index={current_cover_index} /> */}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openConcept,
    hideNavbar,
    selectCover
  }, dispatch)
}

const selector = createSelector(
  state => state['covers'],
  state => state['dark_mode'],
  state => state['concept_open'],
  state => state['navbar_hidden'],
  state => state['window'],
  state => state['selected_cover'],
  (
    covers,
    dark_mode,
    concept_open,
    navbar_hidden,
    window_dimensions,
    selected_cover
) => {
    return  {
      covers,
      dark_mode,
      concept_open,
      navbar_hidden,
      window_dimensions,
      selected_cover
    };
  }
);

export default connect(selector, matchDispatchToProps)(Concepts);
