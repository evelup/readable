import React from 'react';

const Row = ({ children, alignItems, justifyContent, className }) => {
  return (
    <div className={`row ${className} ${alignItems && alignItems} ${justifyContent && justifyContent}`}>
      {children}
    </div>
  )
};

export default Row;
