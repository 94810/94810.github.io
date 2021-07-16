import { CardDeck } from 'components/CardDeck'
import { CardSquare } from 'components/CardSquare';
import { Cover, Nav } from 'components/Header'
import { Profile } from 'components/Profile';
import React from 'react'

const cards = [
  {
    title: "Sweet Spine",
    imgSrc: require('../static/imgs/Sweetspine-square.jpg'),
    body: "A prototype of a serious game for Android combining VR and motion gaming developped under Unity 3D."
  },
  {
    title:"Doreimi",
    imgSrc: require('../static/imgs/doreimi.png'),
    body:"Prototype of puzzle game using Unity 3D, inspired by pikmin"
  },
  {
    title:(<a href="https://github.com/ZpXx/mathsJv#description-des-fichiers">Poutine Physics</a>) ,
    imgSrc: require('../static/imgs/PoutinePhysic.png'),
    body:"A minimal physics library for the Irrlicht Engine in C++."
  },
  {
    title:(<a href="https://dario-arena.herokuapp.com/home">Dario Arena</a>),
    imgSrc: require('../static/imgs/dario-1.png'),
    body:"A multiplayer arena game inspired by Super Mario War : Stomp Arena. Using Vanilla JavaScript, Canvas and Websocket."
  }
];

export default () => (
  <>
  <Nav/>
  <Cover/>
  <div className='content'>
    <h1>About Me</h1>
    <div className="about-me-profile">
      <Profile/>
    </div>
    <p>
      I am a software engineer from France. I graduated from the <a href="https://www.isty.uvsq.fr/">Instut des sciences et Techniques des Yvelines</a>
      {' and the '}<a href="https://www.isty.uvsq.fr/">Université du Québec à Chicoutimi</a>. Passionate about technology, new as well as old, when not 
      coding I am probably tinkering around my car or my 3d printers.  
    </p>

    <p>
    For the past tree years I was a full-stack developer and software architect for <a href="https://www.sgforge.com/">Societe Generale – FORGE</a>
    </p>
    <h1>My work</h1>
      <CardDeck cardDescriptor={cards} />
      <footer>Header Image : Return to the Veil Nebula from ESA</footer>
  </div>
  </>
)
