import React from 'react';
import cx from 'classnames';
import './styles.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
}


const Button: React.FC<ButtonProps> = ({ text, onClick, primary, secondary }) => {

  const buttonClass = cx('button', {
    'button--primary': primary,
    'button--secondary': secondary,
  });

  return (
    <button className={buttonClass} onClick={onClick}>{text}</button>
  );
}

export default Button;