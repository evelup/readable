import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ children, path, id, ...rest }) => {
  return (
    <div className="section" key={id} {...rest}>
      {children}
    </div>
  )
};

export default Section;
