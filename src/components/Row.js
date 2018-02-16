import React from 'react';

const Row = ({ children, alignItems, justifyContent }) => {
  return (
    <div className={`row ${alignItems && alignItems} ${justifyContent && justifyContent}`}>
      {children}
    </div>
  )
};

export default Row;
