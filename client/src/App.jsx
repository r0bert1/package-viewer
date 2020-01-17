import React, { useState } from 'react';
import List from './components/List';
import Info from './components/Info';

import './App.css';

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container">
      <div className="list">
        <List setSelected={setSelected} />
      </div>
      <div className="info">
        <Info selected={selected} />
      </div>
    </div>
  );
};

export default App;
