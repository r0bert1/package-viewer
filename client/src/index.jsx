import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PackageInfo = ({ selected }) => {
  if (!selected) {
    return null;
  }

  return (
    <div>
      <p>{selected.name}</p>
      <p>{selected.desc}</p>
    </div>
  );
};

const App = () => {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const getPackages = async () => {
      const response = await fetch('http://localhost:3001/api/packages');
      const data = await response.json();
      setPackages(data);
    };
    getPackages();
  }, []);

  const columnStyle = {
    display: 'flex'
  };

  const itemStyle = {
    flex: '1'
  };

  return (
    <div style={columnStyle}>
      <div style={itemStyle}>
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
      </div>
      {packages.length > 0 ? (
        <div style={itemStyle}>
          <PackageInfo selected={selected} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
