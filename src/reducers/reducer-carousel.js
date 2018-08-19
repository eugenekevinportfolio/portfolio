import uniqueId from 'lodash/uniqueId';
import takao from '../img/Takaomachi.jpg';
import oko from '../img/Oko.jpg';
import view from '../img/View.jpg';
import street from '../img/Street.jpg';
import expedition from '../img/Expedition.jpg';
import temple from '../img/Temple.jpg';
import yoyogi from '../img/Yoyogi.jpg';
import saga from '../img/Saga.jpg';
import kago from '../img/Kago.jpg';
import kumastreet from '../img/KumaStreet.jpg';
import statue from '../img/Statue.jpg';
import ibusuki from '../img/SandOnsen.jpg';
import village from '../img/Village.jpg';

const initialState = {
  isAutoPlay: true,
  isOpen: false,
  sets: {
    [uniqueId('set-')]: {
      parent: "moment-9",
      pictures: {
        [uniqueId('picture-')]: {
          src: oko,
          title: "Okonomiyaki",
          location: "Shibuya, Tokyo",
          description: "I spent my first night eating okonomiyakis, those delicous Japanese pancakes that you cook yourself on a very hot plate. You don't get tired of those even after a hundred times. My favorite spot for okonomiyakis was Sakurei Tei, a very hipster place in the middle of Shibuya."
        },
        [uniqueId('picture-')]: {
          src: view,
          title: "Shinjuku's Skyline",
          location: "Hatagaya, Tokyo",
          description: "I used to live in a sharehouse in Hatagaya, near Shinjuku. This is the view that I had from the house'rooftop. In the distance, you can see Shinjuku's skyline; very impressive the first time you see it, especially at night."
        },
        [uniqueId('picture-')]: {
          src: street,
          title: "Quiet Street",
          location: "Toshima, Tokyo",
          description: "This is a typical Japanese street at night. I just love how they feel different from what I am used to in France. It's probably because of the proportions: Japanese streets are very narrow and houses look tinier. My Japanese friends never understood why I'd get so excited for these streets."
        },
        [uniqueId('picture-')]: {
          src: expedition,
          title: "Night Expedition",
          location: "Toshima, Tokyo",
          description: "One of my many night expeditions. I used to love wandering with no purpose at night in the empty streets of Tokyo. Also, since the konbinis were open 24 hours a day, I would always grab a snack or drink whenever I felt the need."
        },
        [uniqueId('picture-')]: {
          src: temple,
          title: "Hachimangu Shrine",
          location: "Shinjuku, Tokyo",
          description: "That's typically something that I love about wandering randomly in the streets of Japan: discovering temples and shrines. Each time I discovered a new one, it felt like a huge reward, as if it was telling us 'Thank you for exploring'."
        },
        [uniqueId('picture-')]: {
          src: yoyogi,
          title: "Yoyogi Park",
          location: "Harajuku, Tokyo",
          description: "My favorite park in Tokyo, by far. I spent so many hours there, walking, playing, or picnicking. Located right next to Harajuku Station, it is a bowl of fresh air when one wants to rest from the agitated crowd of Shibuya."
        },
        [uniqueId('picture-')]: {
          src: takao,
          title: "Takaomachi",
          location: "Hachioji, Japan",
          description: "An hour away from the middle of Tokyo by train lies Mount Takao. The hiking was so much fun, somewhere between eerie and mystical, and the scenery was truly breathtaking. The empty streets of Hachioji, in which resonated old Japanese songs, felt so special."
        },
        [uniqueId('picture-')]: {
          src: saga,
          title: "Beyond the mountain",
          location: "Sagamihara, Japan",
          description: "After climbing the mountain, I ended up on the other side, and discovered a rural city that looked nothing like I had seen before. I walked for hours in the ghost misty city until I found a small restaurant where I ate before taking the train back home."
        },
      }
    },
    [uniqueId('set-')]: {
      parent: "moment-10",
      pictures: {
        [uniqueId('picture-')]: {
          src: kago,
          title: "Calm Park",
          location: "Kagoshima, Japan",
          description: "This is Kagoshima, the first city of Kyushu we visited. This was my spot, a park located in the middle of the city, and surrounded by mountains."
        },
        [uniqueId('picture-')]: {
          src: ibusuki,
          title: "Sand Onsen",
          location: "Ibusuki, Japan",
          description: "Ibusuki's famous sand onsens. The sand is warmed thanks to the lava underground. People get buried there for ten minutes under an umbrella to protect them from the sun. It gets so hot that after a while, you can feel your heartbeat in all your body and you get really dizzy."
        },
        [uniqueId('picture-')]: {
          src: kumastreet,
          title: "Hot Street",
          location: "Kumamoto, Japan",
          description: "I had booked an Airbnb at Kumamoto the night before I was supposed to arrive there. When I got off the Shinkansen, I was greeted by a very hot sun, beautiful Japanese countryside, and the loud songs of cicadas."
        },
        [uniqueId('picture-')]: {
          src: statue,
          title: "Thoughtful statue",
          location: "Reigando, Japan",
          description: "I asked my host if he could drive me to a nearby cave, Reigando, that was said to be sacred. The holy place was dedicated to an ancient saint, Miyamoto Musashi, who settled there to write his book. Outside the cave lied five hundred statues of Buddha's disciples. What an eerie place."
        },
        [uniqueId('picture-')]: {
          src: village,
          title: "Lost Village",
          location: "Near Reigando, Japan",
          description: "After visiting Reigando, I decided to visit the surroundings, and ended up in a village in the middle of nowhere. It felt like I had landed on another planet. Probably one of the best hikings I have ever done."
        },
      }
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ENTER_CAROUSEL":
      return {
        ...state,
        isOpen: action.payload
      }
    case "AUTOPLAY":
      return {
        ...state,
        isAutoPlay: action.payload
      }
  }
  return state;
};
