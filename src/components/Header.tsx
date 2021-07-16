import * as React from "react";
import { MagickText } from "./MagicText";
import { ParallaxBackground } from "./Parallax";
import { CanvasBackground } from "./Plasma";

export const NavContact = () => (
    <ul>
      <li>
        <a href="mailto:pablo.bourdelas@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/pbourdelas/">
          <i className="fab fa-linkedin"></i>
        </a>
      </li>
      <li>
        <a href="https://github.com/94810">
            <i className="fab fa-github-square"></i>
        </a>
      </li>
      <li>
        <a href="https://discordapp.com/users/194769750570696705">
          <i className="fab fa-discord"></i>
        </a>
      </li>
    </ul>
)

export const CVLink = () => <a href={require('../static/documents/CV-Bourdelas-Pablo.pdf')} title="Get my CV !">Pablo Bourdelas</a>

export const Nav = () => (
  <nav>
    <span className="header-id">
      <span className="header-name">
       <CVLink/>
      </span>
    </span>
  </nav>
);

export const Cover = () => <div className="header-cover">
  <ParallaxBackground className="header-cover-background" coef={-0.3}>
      <div className="header-cover-hook">
        <h2>Hi, I'm <CVLink/></h2>
        <MagickText rep={9} coef={0.1} mainColor={[255,255,255]} trailColor={[119,74,138]}>
          Bienvenue
        </MagickText>
      </div>
      <CanvasBackground/>
      <div className="header-cover-contact">
       <NavContact />
      </div>
  </ParallaxBackground>
</div>;