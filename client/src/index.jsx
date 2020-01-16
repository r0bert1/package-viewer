import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const response = await axios.get('http://localhost:3001/api/packages');
      setPackages(response.data);
    };
    getPackages();
  }, []);

  const findPackage = name => packages.find(pkg => pkg.name === name);

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
            <li key={pkg.name}>{pkg.name}</li>
          ))}
        </ul>
      </div>
      {packages.length > 0 ? (
        <div style={itemStyle}>
          <p>{findPackage('accountsservice').desc}</p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
