import React from 'react';

const Box = ({ children, onClick, id, className }) => {
  return (
    <div className={`box ${className}`} onClick={onClick} key={id}>
      {children}
    </div>
  )
};

export default Box;
