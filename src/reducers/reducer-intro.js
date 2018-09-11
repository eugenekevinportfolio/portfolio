import uniqueId from 'lodash/uniqueId';

const initialState = {
  [uniqueId('intro-')]: {
    text: "Hi.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "I'm Kevin.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "I currently live in Paris but I have lived a year in Southern France and almost a year in Tokyo, Japan.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "I’m deeply, genuinely passionate about design.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "About five years ago, my attraction towards user experience became very strong and I started creating concepts for Apple products on my own.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "As I was studying Computer Science and not UI-UX at school, I had to learn everything by myself.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "This website is my portfolio. It showcases some of the projects I have done on my free time.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "It was crafted from scratch with React with love, passion, and attention to details at its highest.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "The concepts have been made using Sketch and Principle.",
    central_position: 0,
    has_focused: false
  },
  [uniqueId('intro-')]: {
    text: "I hope you will enjoy discovering them. :)",
    central_position: 0,
    has_focused: false
  },
  // [uniqueId('intro-')]: {
  //   text: "My name is Kevin Eugene.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I am a graduate from HEC Paris and Telecom ParisTech.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Scroll to the bottom to skip this intro and look at my projects.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Still here? Cool.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Now please let me introduce myself.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I have always been very sensitive to good-looking digital products.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "When I was in high school, I would always spend a good amount of time trying to make my reports as beautiful as possible.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Then, five years ago, I started creating UI-UX concepts.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "My first concept was pretty modest.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "It was for iOS, and I had imagined a way for users to quickly go back to the album they were listening to from the lock screen.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I used Pages and Keynote for this one.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Then, I discovered Sketch for Mac and Principle and my ambition suddenly got way higher.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I knew I wanted to become a designer and make a living out of this passion.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I was at Telecom ParisTech by then, studying Computer Science and not UI-UX design.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "So I had to learn everything by myself.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I started creating UI-UX concepts almost every two months.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Dozens of projects, some of which were aborted in the way, some of which I’m still thinking about.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I wasn’t doing it to purposely challenge myself and become better at it. I was doing it because I was driven by passion.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "In five years, there has not been a single day where design wasn’t somewhere in my mind.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "As soon as there’s a product in my hands, especially digital, like a website or a device, I can’t help but think of how to improve it.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Today, I am a web developer and a designer.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "This is my portfolio.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "This website is part of it.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "It was crafted from scratch with React with love, passion, and attention to details at its highest.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "It represents a glimpse at what I can do in both coding and design.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "I hope you will enjoy navigating through it and discovering all the small surprises I have put here and there.",
  //   central_position: 0,
  //   has_focused: false
  // },
  // [uniqueId('intro-')]: {
  //   text: "Now, feel free to take a look at my resume or at one of the categories that just popped up above. :)",
  //   central_position: 0,
  //   has_focused: false
  // },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CENTRAL_POSITION":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          central_position: action.central_position,
          has_focused: true
        }
      }
    case "SKIP_ALL_INTROS":
      let all_intros_skipped = {};
      for (let key in state) {
        all_intros_skipped[key] = {
          ...state[key],
          has_focused: true
        }
      }
      return all_intros_skipped;
  }
  return state;
};
