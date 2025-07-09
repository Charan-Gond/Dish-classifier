import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedKey = localStorage.getItem('apiKey');
    if (!storedKey) {
      navigate('/login');
    } else {
      setApiKey(storedKey);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Welcome to Your Dashboard</h2>
      <p><strong>Your API Key:</strong> <code>{apiKey}</code></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;