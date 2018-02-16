import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, path }) => {
  return (
    <Link className="button" to={path}>
      {children}
    </Link>
  )
};

export default Button;
