import React from 'react';

const List = ({ packages, setSelected }) => {
  return (
    <>
      <ul>
        {packages.map(pkg => (
          <li key={pkg.name}>
            <a
              href={pkg.name}
              onClick={event => {
                event.preventDefault();
                setSelected(pkg);
              }}
            >
              {pkg.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
