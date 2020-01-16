import React from 'react';

const Info = ({ selected }) => {
  if (!selected) {
    return null;
  }

  return (
    <>
      <p>{selected.name}</p>
      <p>{selected.desc}</p>
    </>
  );
};

export default Info;
