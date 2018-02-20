import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, path, black, margin, onClick }) => {
  return (
    <Link
      className={`button ${black && 'black'} ${margin && margin}`}
      to={path}
      onClick={onClick}
    >
      {children}
    </Link>
  )
};

export default Button;
