import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import Chapters from './Chapters.js';
import Mogi from './Mogi.js';
import Chatroom from './Chatroom.js';
import Video from './Video.js';
import Image from './Image.js';
// import MobileChapters from './MobileChapters.js';
import {
  hideNavbar,
  openConcept,
  selectChapter,
  moveSelector,
} from '../actions/index.js';
import dark_back_down from '../img/Back_Down.png';
import light_back_down from '../img/Light_Back_Down.png';
import dark_back_up from '../img/Back_Up.png';
import light_back_up from '../img/Light_Back_Up.png';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desync_concept_open: false
    }
  }

  componentDidMount() {
    const { window_dimensions, concept_open } = this.props;
    this.last_scroll_position = 0;

    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);

    // Check if concept is open and if so, synchronize
    concept_open && this.setState({desync_concept_open: true});


    // Optimization for videos and universal_messages
    const content = document.getElementsByClassName("video-container");
    for (let i = 0; i < content.length; i++) {
      if (content[i].getBoundingClientRect().bottom < 0 || content[i].getBoundingClientRect().top > window_dimensions.height) {
        // content[i].style.visibility = "hidden";
        if (content[i].children[0].children[0].nodeName === "VIDEO") {
          content[i].children[0].children[0].pause();
        }
      }
      else {
        // content[i].style.visibility = "";
        if (content[i].children[0].children[0].nodeName === "VIDEO") {
          content[i].children[0].children[0].play();
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { concept_open, window_dimensions } = this.props;

    // Desync concept open for animation
    if (!prevProps.concept_open && concept_open) {
      this.setState({ desync_concept_open: concept_open});
    }
    else if (prevProps.concept_open && !concept_open) {
      setTimeout(() => {
        this.setState({ desync_concept_open: concept_open});
      }, 500)
    }
  }

  componentWillUnmount() {
    const { chapters } = this.props;
    this.props.selectChapter(Object.keys(chapters)[0]);
    window.removeEventListener("scroll", this.handleScroll);
    this.handleScroll = undefined;
  }

  backdownStyle() {
    const { navbar_hidden, dark_mode } = this.props;

    if (dark_mode) {
      if (navbar_hidden) {
        return {
          top: "20px",
          borderColor: "white"
        }
      }
      else {
        return {
          opacity: 1,
          borderColor: "white"
        }
      }
    }
    else {
      if (navbar_hidden) {
        return {
          top: "20px"
        }
      }
      else {
        return {
          opacity: 1
        }
      }
    }
  }

  articleContentStyle() {
    const { transparent_article, dark_mode } = this.props;

    if (dark_mode) {
      if (transparent_article) {
        return {
          opacity: 0.2,
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
      if (transparent_article) {
        return {
          opacity: 0.2
        }
      }
    }
  }

  mobileBackdownStyle() {
    const { dark_mode } = this.props;

    if (dark_mode) {
      return {
        borderColor: "white",
      }
    }
  }

  handleScroll(e) {
    const { navbar_hidden, chapters, current_chapter, window_dimensions, selected_cover } = this.props;
    const article_content = document.getElementById("article-content");
    const deltaY = article_content.getBoundingClientRect().top - this.last_scroll_position;

    if (deltaY > 10) {
      navbar_hidden && this.props.hideNavbar(false);
    }
    else if (deltaY < -15) {
      !navbar_hidden && this.props.hideNavbar(true);
    }

    // Optimization for videos and universal_messages
    const content = document.getElementsByClassName("video-container");
    for (let i = 0; i < content.length; i++) {
      if (content[i].getBoundingClientRect().bottom < 0 || content[i].getBoundingClientRect().top > window_dimensions.height) {
        // content[i].style.visibility = "hidden";
        if (content[i].children[0].children[0].nodeName === "VIDEO") {
          content[i].children[0].children[0].pause();
        }
      }
      else {
        // content[i].style.visibility = "";
        if (content[i].children[0].children[0].nodeName === "VIDEO") {
          content[i].children[0].children[0].play();
        }
      }
    }

    if (window_dimensions.isDesktop) {
      const article_titles = document.getElementsByClassName("article-title");
      let distances_from_top = [], positive_values = []
      for (let i = 0; i < article_titles.length; i++) {
        distances_from_top[i] = 135 - article_titles[i].getBoundingClientRect().top;
        if (distances_from_top[i] >= 0) {
          positive_values[i] = distances_from_top[i];
        }
      }

      // If every distance is negative
      if (Math.max(...distances_from_top) < 0) {
        const index_to_select = distances_from_top.indexOf(Math.max(...distances_from_top));
        const id_to_select = article_titles[index_to_select].id;
        if (id_to_select !== current_chapter) {
          this.props.selectChapter(id_to_select);
          const position = chapters[selected_cover][id_to_select].position;
          this.props.moveSelector(position);
        }
      }
      else {
        const index_to_select = positive_values.indexOf(Math.min(...positive_values));
        const id_to_select = article_titles[index_to_select].id;
        if (id_to_select !== current_chapter) {
          this.props.selectChapter(id_to_select);
          const position = chapters[selected_cover][id_to_select].position;
          this.props.moveSelector(position);
        }
      }
    }
    this.last_scroll_position = article_content.getBoundingClientRect().top;

  }

  // frameStyle() {
  //   const { dark_mode } = this.props;
  //   const { desync_concept_open } = this.state;
  //
  //   if (dark_mode) {
  //     if (!desync_concept_open) {
  //       return {
  //         display: "none"
  //       }
  //     }
  //     else {
  //       return {
  //         backgroundColor: "#262626"
  //       }
  //     }
  //   }
  //   else {
  //     if (!desync_concept_open) {
  //       return {
  //         display: "none"
  //       }
  //     }
  //   }
  // }

  renderArticle() {
    const { selected_cover } = this.props;

    switch (selected_cover) {
      case "mogi":
        return <Mogi />
        break;
      case "chatroom":
        return <Chatroom />
        break;
      default:
        return <div />
    }
  }

  render() {
    const { navbar_hidden, dark_mode, window_dimensions } = this.props;
    const back_down = dark_mode ? light_back_down : dark_back_down;
    const back_up = dark_mode ? light_back_up : dark_back_up;

    return (
      <div
        id="article-frame"
        className="article-frame"
        style={dark_mode ? {backgroundColor: "#262626"} : {}}
        >
        {window_dimensions.isDesktop ?
          <div
            onClick={() => {
              this.props.openConcept(false);
              navbar_hidden && this.props.hideNavbar(false);
            }}
            style={this.backdownStyle()}
            className="back-down-button">
            <img src={back_up} className="back-down-img" />
          </div>
          :
          <div
            onClick={() => {
              this.props.openConcept(false);
              navbar_hidden && this.props.hideNavbar(false);
            }}
            style={this.mobileBackdownStyle()}
            className="mobile-back-down-button">
            <img src={dark_back_up} className="back-down-img" />
          </div>
        }
        {window_dimensions.isDesktop &&
          <Chapters />
        }
        {this.renderArticle()}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    hideNavbar,
    openConcept,
    selectChapter,
    moveSelector,
  }, dispatch)
}

const selector = createSelector(
  state => state['window'],
  state => state['dark_mode'],
  state => state['navbar_hidden'],
  state => state['transparent_article'],
  state => state['concept_open'],
  state => state['chapters'],
  state => state['current_chapter'],
  state => state['selected_cover'],
  (
    window_dimensions,
    dark_mode,
    navbar_hidden,
    transparent_article,
    concept_open,
    chapters,
    current_chapter,
    selected_cover
) => {
    return  {
      window_dimensions,
      dark_mode,
      navbar_hidden,
      transparent_article,
      concept_open,
      chapters,
      current_chapter,
      selected_cover
    };
  }
);

export default connect(selector, matchDispatchToProps)(Article);
