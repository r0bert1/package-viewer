import React, { useState, useEffect } from 'react';

const List = ({ setSelected }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      try {
        console.log(process.env.BACKEND_URL);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/packages`
        );
        const data = await response.json();
        setPackages(data);
      } catch (e) {
        console.log(e);
      }
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
