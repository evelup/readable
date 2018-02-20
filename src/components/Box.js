import React from 'react';

const Box = ({ children, onClick, id }) => {
  return (
    <div className="box" onClick={onClick} key={id}>
      {children}
    </div>
  )
};

export default Box;
