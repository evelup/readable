import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ children, path }) => {
  return (
    <div className="section">
      {children}
    </div>
  )
};

export default Section;
