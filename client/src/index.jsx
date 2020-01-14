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

  return (
    <div>
      <ul>
        {packages.map(pkg => (
          <li key={pkg}>{pkg}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
