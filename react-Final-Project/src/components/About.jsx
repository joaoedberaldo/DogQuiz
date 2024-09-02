import React from 'react';
import linkedin from '../assets/linkedin_pixel.png';
import giticon from '../assets/github_pixel.png';
import codeDex from '../assets/CodeDex.png';

const About = () => {
    return (
        <div id='about'>
            <h1>About</h1>
            <p>This is just a fun quiz to help you find out which dog best matches your personality.</p>
            <p>The quiz is based on completely random things. Have fun ^_^</p>
            <div className="social-icons">
            <p className='author' >Author links:</p>
            <a
              href="https://www.codedex.io/@EduardoIada"
              target="_blank"
              rel="noopener noreferrer">
              <img src={codeDex} width={25} height={25} />
              Codédex
            </a>
            <a
              href="https://www.linkedin.com/in/joao-eduardo-beraldo-iada/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn Icon" width={25} height={25} />
              LinkedIn
            </a>
            <a
              href="https://github.com/joaoedberaldo"
              target="_blank"
              rel="noopener noreferrer">
              <img src={giticon} width={25} height={25} />
              GitHub
            </a>
          </div>
        </div>
    );
};

export default About;