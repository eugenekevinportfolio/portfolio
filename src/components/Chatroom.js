import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import '../styles/Concepts.css';
import Video from './Video.js';
import Image from './Image.js';
import normal from '../img/Normal.jpg';
import opened from '../img/Opened.jpg';
import entering from '../videos/Entering Chatroom.mp4';
import keyboard from '../img/Keyboard.jpg';
import chatroom from '../img/Chatroom.jpg';
import screenshot from '../videos/Screenshot.mp4';
import people from '../img/People.jpg';
import stream from '../img/Stream.jpg';
import message from '../videos/Message.mp4';
import drawer from '../videos/Drawer.mp4';
import chat from '../img/Chat.jpg';
import expanded from '../img/Expanded.jpg';
import music from '../videos/Music.mp4';
import shared_music from '../img/Shared_Music.jpg';
import pages from '../videos/Pages.mp4';
import live from '../videos/Live.mp4';
import safari from '../img/Safari.jpg';
import group from '../videos/Group.mp4';
import conference from '../img/Conference.jpg';
import sharing from '../videos/Sharing.mp4';
import first from '../img/First.jpg';
import present from '../img/Present.jpg';

class Chatroom extends Component {
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

  render() {
    const { dark_mode, window_dimensions } = this.props;
    const scrollTopOffset = window_dimensions.isDesktop ? 135 : 90;
    const medium = "https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b"

    return (
      <div
        id="article-content"
        style={this.articleContentStyle()}
        className="article-content">
        {/* Intro */}
        <p
          id="intro2"
          className="article-title">
          Introducing iMessage's Chatroom
        </p>
        <p className="article-paragraph">
          If you want to know more about the design process, you can scroll down to <span onClick={() => {
            const design = document.getElementById("design");
            design.scrollIntoView();
            document.documentElement.scrollTop -= scrollTopOffset;
          }}>"About the design process"</span>.
        </p>
        <p className="article-paragraph">
          I am a long-time user of iMessage. Back when it was introduced, I fell in love with the typing dots and the system that combined both regular messages and iMessages: instant messaging felt more real than ever, bringing people much closer than what I was used to. With iOS 10, Apple introduced iMessage Apps, and while I think they are very powerful and really have a lot of potential, I still believe that more could be achieved in this area.
        </p>
        <p className="article-paragraph">
          More particularly, I have always felt frustrated by the sharing experience. While instant messaging tries to convey a feeling of instantaneity, sharing content feels stuck in time: typically, one shares a link to a video or a music found on the Internet, then moves away to something else. But sharing content is more than literally just sharing content: it’s about sharing an experience.
        </p>
        <p className="article-paragraph">
          Chatroom has been designed with this very idea in mind: to make enjoying content with relatives in real time a reality. Let’s see how it works.
        </p>
        <p className="article-paragraph">
          When Chatroom is available for an extension, this is what it looks like on the sender’s side.
        </p>
        <Image src={normal}>
          A regular conversation with a Chatroom available.
        </Image>
        <p className="article-paragraph">
          Notice the icon at the top right corner that indicates that Chatroom is available.
        </p>
        <p className="article-paragraph">
          When the receiver opens the link, the sender’s side gets updated like the following:
        </p>
        <Image src={opened}>
          When the receiver is watching the video.
        </Image>
        <p className="article-paragraph">
          As soon as the receiver opens the link, the little icon turns to red, indicating that he is watching the video. His profile icon pops up on the bubble itself to signal his presence in the Chatroom. Finally, the extension’s icon is displayed on the top bar so the sender can quickly join their friend in  the Chatroom.
        </p>
        <p className="article-paragraph">
          Joining the Chatroom is done with a simple tap:
        </p>
        <Video src={entering}>
          Joining the Chatroom.
        </Video>
        <Image src={chatroom}>
          A still image of the Chatroom for in-depth analysis.
        </Image>
        <p className="article-paragraph">
          Chatroom is characterized by the bottom drawer, directly inspired by Apple Maps. I believe the drawer is very good at preserving the context while allowing to do something else, so in place like Chatroom where content is to be at the forefront, I thought it belonged very naturally.
        </p>
        <p className="article-paragraph">
          In the typing bar, one can type their message just as they would in a conversation.
        </p>
        <Image src={keyboard}>
          Opening the Keyboard in Chatroom. In portrait mode, the video moves upwards so as not to be hidden by the drawer while typing.
        </Image>
        <p className="article-paragraph">
          As sharing screenshots or video recordings are essential to commenting content, I decided to place these buttons there for easy access, and also, as a way to suggest users to share content using these two core features.
        </p>
        <Video src={screenshot}>
          Taking a screenshot in the Chatroom and sending it.
        </Video>
        <p className="article-paragraph">
          Above the typing bar are shown the people present in the Chatroom along with the user. This part was designed to be scalable to situations where a lot of people are present on the one hand, and also to remind of regular conversations where the sender’s messages are on the right and the receiver’s on the left.
        </p>
        <Image src={people}>
          Somehow, I managed a lot of people to watch with me The Battle of the Ice Cream.
        </Image>
        <p className="article-paragraph">
          People currently present in the Chatroom are marked with a red dot. The others are present in the conversation, but not in the Chatroom. Only persons present in the conversation can have access to the Chatroom.
        </p>
        <p className="article-paragraph">
          Tap a user icon with a red dot to reveal where they are in the stream. You can then tap the time displayed to synchronise with your friend:
        </p>
        <Image src={stream}>
          Revealing where Bastien is at in the video.
        </Image>
        <p className="article-paragraph">
          When someone sends a message, the bubble appears on overlay:
        </p>
        <Video src={message}>
          Commenting Simon's defeat.
        </Video>
        <p className="article-paragraph">
          The drawer can be expanded in order to have a full record of the conversation:
        </p>
        <Video src={drawer}>
          Expanding the drawer.
        </Video>
        <Image src={expanded}>
          The expanded view in details.
        </Image>
        <p className="article-paragraph">
          All these messages can also be found in the conversation itself. Messages that were sent within the Chatroom are marked by the extension that was in use then; tapping the icon will lead to the corresponding content.
        </p>
        <Image src={chat}>
          Messages sent in the Chatroom are also found in the conversation.
        </Image>
        <p
          id="scope"
          className="article-title">
          Expanding the scope
        </p>
        <p className="article-paragraph">
          Chatroom has been designed to suit multiple use cases. Typically, most of my conversations with friends revolve around a piece of music one of use found online. In this type of conversations, I often want to highlight a particular moment in the music, and comment it, but the current experience does not make it easy. With timestamps and markers, this becomes a reality in Chatroom:
        </p>
        <Video src={music}>
          Listening to music with a friend.
        </Video>
        <Image src={shared_music}>
          Still image of music in iMessage.
        </Image>
        <p className="article-paragraph">
          Chatroom is also tailored for collaboration. Similarly to Google Docs or Live Collaboration on Pages, you can share a document to a friend on iMessage and you’ll be able to work with them on it directly from there.
        </p>
        <Video src={pages}>
          Working in Pages in iMessage.
        </Video>
        <p className="article-paragraph">
          Each person has a different color, so you know in a glimpse what contribution is whose. Each time somebody modifies the document (highlights some parts, deletes paragraphs or add content like pictures or videos), everyone else in the Chatroom is notified with a small notification that pops up only in the document.
        </p>
        <p className="article-paragraph">
          Moreover, thanks to Live Notifications introduced in iOS Mogi (if you don’t know what they are, please <a target="_blank" rel="noopener noreferrer" href={medium}>head to this Medium article</a> for a full explanation), you can even quit iMessage and drag onto the document elements found elsewhere:
        </p>
        <Video src={live}>
          Editing the document from outside.
        </Video>
        <p className="article-paragraph">
          In this version of iOS, there’s also a new iMessage extension for Safari, which allows you to share webpages with your relatives. Open the link in iMessage and from there, you will be able to highlight text or draw shapes on the webpage itself thanks to the Markup tools, as if it had been transformed into a pdf.
        </p>
        <Image src={safari}>
          Safari Link opened in iMessage.
        </Image>
        <p className="article-paragraph">
          Highlights and comments will be added to the Notes app so as not to lose them and keep access to them. A new note will be created for each website.
        </p>
        <p
          id="groups"
          className="article-title">
          Group conversation
        </p>
        <p className="article-paragraph">
          Chatroom really shines when it comes to group conversations. Each one of the persons involved can be in a different Chatroom, enjoying content on their own or in subgroups. Users in a Chatroom will be tagged with the extension’s icon. Tap on their profile to reveal more information and instantly join them in their Chatroom.
        </p>
        <Video src={group}>
          Joining Bastien’s Chatroom.
        </Video>
        <p
          id="conference"
          className="article-title">
          Video conference
        </p>
        <p className="article-paragraph">
          With Group FaceTime being a reality, Chatroom can also be used with video conferencing. Expand the drawer, and tap the FaceTime icon to launch a video session with your friends.
        </p>
        <Image src={conference}>
          Video conferencing with beautiful people.
        </Image>
        <p
          id="shell"
          className="article-title">
          Breaking out of the shell of iMessage
        </p>
        <p className="article-paragraph">
          While I was designing this concept, I really wanted Chatroom to be available everywhere in the OS, not just in iMessage. I am indeed particularly fond of the idea of having a messaging app that is not restrained to its own app, but rather that infuses throughout the entire system. And as iMessage is a native iOS application, it should definitely take advantage of it to really distinguish itself from its competitors and be at the heart of the iOS experience.
        </p>
        <p className="article-paragraph">
          To pursue this idea, I decided to embed Chatroom directly in the native iOS video player. So, for every video you’ll be watching, no matter which app you’re using, you’ll be able to share it to a friend and directly comment it from there, with all the features that were introduced previously in this concept.
        </p>
        <Video src={sharing}>
          Entering Chatroom from a video on Safari.
        </Video>
        <p className="article-paragraph">
          Tap on one of your favorite contacts to quickly share the video with them. You can also share the video via AirDrop if your friends are nearby. Chatroom will open: you can now comment in real time the video without having to switch back-and-forth between two apps.
        </p>
        <p className="article-paragraph">
          This usage could also expand to other apps as well thanks to an API that would allow any developer to embrace Chatroom in their apps. For instance, whenever I read an interesting article on Medium, I take screenshots of the parts that caught my eye and send them to friends to engage a conversation. Switching back-and-forth between Medium and iMessage can be exhausting, but Chatroom in Medium could potentially make it a lot easier. It would probably require a bit of work on the developer’s side though, that’s why I’m not building more on this idea, merely proposing new leads for further developments of this concept.
        </p>
        <p
          id="design"
          className="article-title">
          About the design process
        </p>
        <p className="article-paragraph">
          I first came up with the idea of a live messaging app about a year and a half ago. I was chatting with a friend of mine and he wanted me to watch an episode from one of his favorite TV show (Twin Peaks). I agreed after a few minutes and decided to watch it on my iPhone. However, while I was watching, we kept on talking to each other so I had to switch a lot of times from the video to the messaging app: it was an extremely tiring experience that prevented me from fully enjoying the episode. At this point, the idea of having a messaging app that would allow to do something else while keeping on chatting started to emerge.
        </p>
        <p className="article-paragraph">
          Chatroom was challenging for several reasons. The first one I can think of is readability: how should messages be designed so as to prevent hiding too much of the content? After all, messages are to be at the core of Chatroom, but so is the content. One of the first mockup I came up with was the following:
        </p>
        <Image src={first}>
          My first vision of Chatroom.
        </Image>
        <p className="article-paragraph">
          Messages would pop up directly onscreen while watching a video in a layout similar to regular conversations. The higher they would get, the less opaque they would be, so as to prevent hiding the content below. I decided to reject this design for three reasons: the first one is that this design would have not been compatible with landscape mode. In landscape mode, the vertical space available is drastically reduced, and messages would have taken too much of it had they been popping up like this, hiding too much of the content.
        </p>
        <p className="article-paragraph">
          The second reason is that it would have been a huge source of visual distraction, and it would have impacted the user experience. Messages popping up from the bottom would ultimately catch the eye there, preventing the user from fully enjoying their content.
        </p>
        <p className="article-paragraph">
          The final reason is that this design would have been hardly scalable to other use cases, which represents a huge part of this concept. To make it work in cases like collaboration in a document, the user interface would have to be changed. If so, Chatroom would not have had a strong visual identity that would make it easily recognizable, and people would have not known whether they would be using it or if it was just part of the app’s experience.
        </p>
        <p className="article-paragraph">
          Because of all these reasons, I decided to reject this design and ended up with the one presented in this concept.
        </p>
        <p className="article-paragraph">
          Another challenging aspect was to convey the feeling of a shared experience, typically, how should the UI represent the people present in the Chatroom? At first, I came up with this design:
        </p>
        <Image src={present}>
          Attempting to design how the people present in the Chatroom would be represented.
        </Image>
        <p className="article-paragraph">
          The people present in the Chatroom would have been stacked at the top, in a horizontal scrollable list. I rejected this design too as once again, it would have been hard to scale it to other use cases and it seemed to have been designed specifically for the video player. Also, on the subjective side, I thought it didn’t look attractive and impaired the balance of this screen.
        </p>
        <p className="article-paragraph">
          I ended up with the current design as it looked more elegant, provided more features and was more easily reachable by the thumb.
        </p>
        <p className="article-paragraph">
          Now that you know more about the design process that went with it, please let me know what you think of this concept, I would be really glad to have your feedback and share ideas with you. :)
        </p>
      </div>
    );
  }
}

const selector = createSelector(
  state => state['window'],
  state => state['dark_mode'],
  state => state['transparent_article'],
  state => state['chapters'],
  state => state['current_chapter'],
  (
    window_dimensions,
    dark_mode,
    transparent_article,
    chapters,
    current_chapter
) => {
    return  {
      window_dimensions,
      dark_mode,
      transparent_article,
      chapters,
      current_chapter
    };
  }
);

export default connect(selector)(Chatroom);
