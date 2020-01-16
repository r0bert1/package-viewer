import React, { useState, useEffect } from 'react';
import List from './components/List';
import Info from './components/Info';

import './App.css';

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

  return (
    <div className="container">
      <div className="list">
        <List packages={packages} setSelected={setSelected} />
      </div>
      <div className="info">
        <Info selected={selected} />
      </div>
    </div>
  );
};

export default App;
