import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import '../styles/Concepts.css';
import Chapters from './Chapters.js';
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
import apple_maps from '../videos/Apple Maps.mp4';
import reading from '../videos/Reading.mp4';
import notification_centre from '../videos/Notification Centre.mp4';
import stopwatch from '../img/Stopwatch.jpg';
import uber from '../img/Uber.jpg';
import lockscreen from '../img/Lockscreen.jpg';
import stopwatch_video from '../videos/Stopwatch.mp4';
import livesharing from '../videos/LiveSharing.mp4';
import summoning from '../videos/Summoning Siri.mp4';
import sending from '../videos/Sending.mp4';
import switching from '../videos/Switching.mp4';
import actions from '../videos/Siri actions.mp4';
import mail from '../videos/EditOnTheGo.mov';
import saving from '../videos/SavePicture.mp4';
import saved_dragged from '../videos/SavedDragged.mp4';
import clipboard_img from '../img/Clipboard.jpg';
import pick from '../img/Pick.jpg';
import cards from '../img/Cards.jpg';
import factorized from '../videos/Factorized.mp4';
import universal_messages from '../img/MessagesApps.jpg';
import universal_contacts from '../videos/Contact.mp4';


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
    const { concept_open } = this.props;

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
    const { navbar_hidden, chapters, current_chapter, window_dimensions } = this.props;
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
          const position = chapters[id_to_select].position;
          this.props.moveSelector(position);
        }
      }
      else {
        const index_to_select = positive_values.indexOf(Math.min(...positive_values));
        const id_to_select = article_titles[index_to_select].id;
        if (id_to_select !== current_chapter) {
          this.props.selectChapter(id_to_select);
          const position = chapters[id_to_select].position;
          this.props.moveSelector(position);
        }
      }
    }
    this.last_scroll_position = article_content.getBoundingClientRect().top;

  }

  frameStyle() {
    const { dark_mode } = this.props;
    const { desync_concept_open } = this.state;

    if (dark_mode) {
      if (!desync_concept_open) {
        return {
          display: "none"
        }
      }
      else {
        return {
          backgroundColor: "#262626"
        }
      }
    }
    else {
      if (!desync_concept_open) {
        return {
          display: "none"
        }
      }
    }
  }

  render() {
    const { navbar_hidden, dark_mode, window_dimensions } = this.props;
    const back_down = dark_mode ? light_back_down : dark_back_down;
    const back_up = dark_mode ? light_back_up : dark_back_up;
    const medium = "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b"
    const scrollTopOffset = window_dimensions.isDesktop ? 135 : 90;

    return (
      <div
        id="article-frame"
        className="article-frame"
        style={this.frameStyle()}
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
        <div
          id="article-content"
          style={this.articleContentStyle()}
          className="article-content">

          {/* Intro */}
          <p
            id="intro"
            className="article-title">
            Introducing Live Notifications
          </p>
          <p className="article-paragraph">
            To have a full overview of the features introduced with iOS Mogi, <a href={medium} target="_blank" rel="noopener noreferrer">take a look at my Medium story.</a> If you just want to hear more about the design process, scroll down to the chapter <span onClick={() => {
              const backstory = document.getElementById("backstory");
              backstory.scrollIntoView();
              document.documentElement.scrollTop -= scrollTopOffset;
            }}>"A little bit of backstory"</span>.
          </p>
          <p className="article-paragraph">
            Live Notifications stand at the core of this concept. They are my attempt at bringing true multitasking to the mobile, meaning, the ability to do multiple things at the same time. To have a clear understanding of what they stand for, let’s imagine first that Apple Maps is able to determine which line the user is currently using.
          </p>
          <Video src={apple_maps}>
            Once the line is confirmed, itineraries will be calculated using the line as a starting point.
          </Video>
          <p className="article-paragraph">
            Once the current line has been confirmed by the user, wouldn’t it be useful if they could have a look at it without leaving what they are doing, like reading for instance? That’s when Live Notifications come into play.
          </p>
          <Video src={reading}>
            Checking the route while reading thanks to a Live Notification. After a while of non-interaction, the blue bar fades away. Also, the name of the app in the Live Notification can be changed to tell more about the situation (here, “Apple Maps” has been changed to “Using Keiō Line”).
          </Video>
          <p className="article-paragraph">
            To have a glimpse at their current position on the line, the user simply needs dragging down the small bar at the top of the screen.
          </p>
          <p className="article-paragraph">
            To open Notification Center, drag further:
          </p>
          <Video src={notification_centre}>
            You have to think of this gesture as <a target="_blank" rel="noopener noreferrer" href="http://www.idownloadblog.com/2016/06/17/ios-10-tidbit-spotlight-in-any-app/">this old iOS 10 one</a>: you drag a bit from the top, you feel a haptic feedback to let you know your Live Notification is open, and if you drag beyond, you open Notification Centre.
          </Video>
          <p className="article-paragraph">
            Live Notifications are a metaphor for the tasks that are currently happening in the background, like a phone call, or reading an article on Medium. They can expand to a much broader horizon of use cases.
          </p>
          <Image src={stopwatch}>
            When the stopwatch is running.
          </Image>
          <Image src={uber}>
            Thanks to Live Notifications, Uber can tell you in real time when your driver will arrive, even if you’re not in the Uber app. Notice that the style of the Live Notification can be customised by the developers to fit their apps’ aesthetics.
          </Image>
          <p className="article-paragraph">
            Live Notifications are also accessible directly from the Lock Screen, so you can quickly go back to what you were doing or check the time left before your Uber arrives.
          </p>
          <Image src={lockscreen}>
            Reading an article on Medium while using the Keio Line. On the Lock Screen, developers can choose to have their Live Notifications expanded by default, for itineraries for instance where it’s important to have directions. (I have also slightly updated the style of the Lock Screen to match the new bolder style of iOS)
          </Image>
          <p className="article-paragraph">
            They are triggered automatically by apps. Simply leave the app and the Live Notification will pop up (if summoned).
          </p>
          <Video src={stopwatch_video}>
            The stopwatch transforming into a Live Notification.
          </Video>
          <p className="article-paragraph">
            The last feature associated to Live Notifications is that they can interact with the current context. For instance, they can be used to quickly share a Medium article through drag-and-drop gestures.
          </p>
          <Video src={livesharing}>
            Medium’s Now Reading Live Notification pops up when Medium is closed. You can then share the article with a simple drag-and-drop.
          </Video>

          {/* Siri */}
          <p
            id="siri"
            className="article-title">
            Siri turns into a Live Notification
          </p>
          <p className="article-paragraph">
            An important feature introduced in iOS Mogi is the brand new Siri, which was designed this time to be non-intrusive and better help the user get the most out of what they are doing. In fact, Siri has been designed to take advantage of the Live Notifications paradigm.
          </p>
          <p className="article-paragraph">
            So, for instance, if the user wants to send a picture to a friend, this is how it looks like in iOS Mogi:
          </p>
          <Video src={summoning}>
            Using Siri in Messages.
          </Video>
          <p className="article-paragraph">
            As with Live Notifications, it can be expanded into a fullscreen view to see the pictures available. As Siri is now contextual aware, pictures can be sent from there very easily:
          </p>
          <Video src={sending}>
            Selecting pictures before sending them.
          </Video>
          <p className="article-paragraph">
            Siri’s results are consistent throughout the system so they can be used elsewhere if needed:
          </p>
          <Video src={switching}>
            When switching between apps, the result of the request remains accessible so it can be used again.
          </Video>
          <p className="article-paragraph">
            Having a vocal assistant that is as deeply integrated into the OS would most surely represent a definitive advantage over its competitors.
          </p>

          {/* Accessibility */}
          <p
            id="accessibility"
            className="article-title">
            Siri actions for better accessibility
          </p>
          <p className="article-paragraph">
            Now that Siri has become non-intrusive, it can do many more things than before, like scrolling or tapping. These elementary actions are called Siri actions. Ask Siri to scroll the page and it will do it for you.
          </p>
          <Video src={actions}>
            Navigating in Apple Music with Siri.
          </Video>
          <Video src={mail}>
            Editing an email on the go with Siri.
          </Video>
          <p className="article-paragraph">
            I believe Siri actions could potentially represent a huge step forward in terms of accessibility, most especially for disabled people.
          </p>

          {/* Clipboard */}
          <p
            id="clipboard"
            className="article-title">
            Native clipboard for iOS
          </p>
          <p className="article-paragraph">
            In iOS Mogi, you can ask Siri to save elements for you.
          </p>
          <Video src={saving}>
            Ask Siri to save elements and it will keep them for you.
          </Video>
          <p className="article-paragraph">
            Using the Live Notifications paradigm, once the element is saved in Siri, you can drag it somewhere else:
          </p>
          <Video src={saved_dragged}>
            Dragging a saved picture in Medium.
          </Video>
          <p className="article-paragraph">
            You can even have a history of all the things that have been saved on your phone or Mac:
          </p>
          <Image src={clipboard_img}>
            Just ask “Show me my saved elements” and Siri will display them in front of you. You can drag them onto the app below or tap them to edit before use.
          </Image>
          <p className="article-paragraph">
            So, that’s a roundup of the features introduced in iOS Mogi. To have a more complete overview of all these features, <a href={medium} target="_blank" rel="noopener noreferrer">please head to the story on Medium.</a>
          </p>
          <p className="article-paragraph">
            Now, please let me tell you more about the design process and how I ended up with Live Notifications.
          </p>

          {/* Backstory */}
          <p
            id="backstory"
            className="article-title">
            A little bit of backstory
          </p>
          <p className="article-paragraph">
            As I said in the intro, I learned design with iOS and the iPhone, so this concept is really special to me. As a big fan from the early days, I have always been eager to add new features to my most beloved devices. Whenever I felt frustration in my experience with the iPhone, I would think of how to improve or even replace the elements at fault with something I thought was a better solution. Something in particular has been in my mind for years: multitasking on the iPhone.
          </p>
          <p className="article-paragraph">
            I am not a big fan of splitting the screen on a mobile, or anything that looks like it, like picture-in-picture or similar. I believe it’s trying to translate desktop solutions to the mobile, but the mobile has its own language. It deserves original solutions that are best fitted to its limitations and strengths.
          </p>
          <p className="article-paragraph">
            At first, I came up with <a href="https://eugenekevin.github.io/" target="_blank" rel="noopener noreferrer">iOS Fuji</a>. It was my very first attempt at bringing true multitasking to iOS. It was also the first time I used Sketch to produce a whole concept. The idea was to factorize the workflow by the tasks that had been performed by the user, not the apps, and to provide a UI that could allow them to quickly go back to them.
          </p>
          <Image src={pick}>
            Selecting one of the previous tasks in iOS Fuji with the "PickPad".
          </Image>
          <p className="article-paragraph">
            It also introduced the notion of « cards » that were scaled down versions of apps with the strict minimum to allow the user to perform their task, like sending an email or writing a note.
          </p>
          <Image src={cards}>
            When a task was selected, a card would pop up from the top of the screen. The card was draggable, and there were three states: minimized, expanded, and fullscreen.
          </Image>
          <p className="article-paragraph">
            I still think those are good ideas, and Siri Shortcuts stand as a proof of that as they are a step in this direction, but as I lacked experience, the concept and its execution were slightly flawed and never really took off online. One of the concept's biggest flaw is that it introduced a whole new gesture language, along with a new hardware (the PickPad) to perform simple tasks that were already possible with the available language system. However, I learned so much from this first experience.
          </p>
          <p className="article-paragraph">
            In particular, I learned that designers needed to take into account what was already existing on the platform they were working on and try to make something new with it - if that is what they are striving for - instead of coming up with a whole new language system, as people simply won’t follow. Change needs to happen little by little. The goal is not to make something different, but something better.
          </p>
          <p className="article-paragraph">
            So, enriched by these learnings, I decided to rebuild iOS Fuji from the ground up, and that is how <a href="https://eugenekevindesign.github.io/" target="_blank" rel="noopener noreferrer">iOS Fuji 2.0</a> was born. This time around, it was all about unification and what better tool than Siri to do so? With this brand new version, I tried to respect as much as possible what was already there, understand why everything was where and how it was. For instance, long pressing the Home Button would summon Siri Panel, an augmented version of Siri, where actions were factorized by content and not apps.
          </p>
          <Video src={factorized}>
            With Siri Panel, users could see at a glance all the conversations with a friend, no matter the app.
          </Video>
          <p className="article-paragraph">
            Fuji 2.0 also introduced a Universal Messaging app - to prevent users from switching back-and-forth from a messaging app to another - along with Universal Contacts, which showed every friend's profile from every app they were using.
          </p>
          <Image src={universal_messages}>
            Universal Messages, with messages from every messaging app on the phone.
          </Image>
          <Video src={universal_contacts}>
            Universal Contacts that stored every profile from the user's contacts.
          </Video>
          <p className="article-paragraph">
            I feel this second attempt was more sophisticated than the first one. However, Siri Panel might be too far from what people are used to for them to actually use it. Multitasking and Siri being somehow merged could cause confusion, and although it brought some interesting ideas like unification, I feel it didn't respond entirely to my initial desire, which was to bring multitasking to iOS.
          </p>
          <p className="article-paragraph">
            So for my last attempt, <a href={medium} target="_blank" rel="noopener noreferrer">iOS Mogi</a>, I decided to change as little as possible the existing paradigm so as not to disturb long-time iOS users. The first idea that emerged from my brainstorm was the new Siri, which kind of debuted in <a href="https://eugenekevindesign.github.io/" target="_blank" rel="noopener noreferrer">iOS Fuji 2.0</a> if you look closely. From there, I thought it would be interesting to see if the new paradigm could also be used elsewhere in the system, without relying on Siri. This is how the idea of Live Notifications - notifications that would be consistent and could interact with the context - came up. I tried to reflect this process in <a href={medium} target="_blank" rel="noopener noreferrer">my Medium article</a>, as I start with the new Siri, then introduce Live Notifications.
          </p>
          <p className="article-paragraph">
            <a href="https://www.linkedin.com/in/eugenekevin/" target="_blank" rel="noopener noreferrer">Don't hesitate to tell me how you feel about iOS Mogi!</a> I would be really glad to hear your feedback! :)
          </p>
        </div>
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
  (
    window_dimensions,
    dark_mode,
    navbar_hidden,
    transparent_article,
    concept_open,
    chapters,
    current_chapter
) => {
    return  {
      window_dimensions,
      dark_mode,
      navbar_hidden,
      transparent_article,
      concept_open,
      chapters,
      current_chapter
    };
  }
);

export default connect(selector, matchDispatchToProps)(Article);
