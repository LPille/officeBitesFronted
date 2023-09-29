// Navbar.tsx
import React from 'react';
import './styles.scss';
import Button from '../Button/button';
import { ParallaxProvider, Parallax } from "react-scroll-parallax";


const Header: React.FC = () => {

  const handleClick = () => {
    console.log('Button clicked');
  };  
  
  return (
    <div className='header'>
      <ParallaxProvider>
        <div className='header-container'>
          <Parallax 
            className='parralax image-bowl'
            translateY={[0, 40]}
            shouldAlwaysCompleteAnimation={true}
          />
          <Parallax 
            className='parralax image-bohnen'
            translateY={[0, -40]}
            shouldAlwaysCompleteAnimation={true}
          />

          <Parallax 
            className='parralax image-kraueter'
            translateY={[0, -70]}
            shouldAlwaysCompleteAnimation={true}
          />

          <Parallax 
            className='parralax image-tomatos'
            translateY={[0, -70]}
            shouldAlwaysCompleteAnimation={true}
          />

          <Parallax 
            className='parralax image-knoblauch'
            translateY={[0, -30]}
            shouldAlwaysCompleteAnimation={true}
          />

          <Parallax 
            className='parralax image-pasta'
            translateY={[0, 40]}
            shouldAlwaysCompleteAnimation={true}
          />
          <div className='body'>
            <div className='title'>
              <h1>Whip up <span className='highlited'>Something</span> Tasty</h1>
            </div>
            <Button text="Explore Receipes" onClick={handleClick} primary={true} />
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
};

export default Header;
