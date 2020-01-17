import React, { useState, useEffect } from 'react';

const List = ({ setSelected }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const response = await fetch('http://localhost:3001/api/packages');
      const data = await response.json();
      setPackages(data);
    };
    getPackages();
  }, []);

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
