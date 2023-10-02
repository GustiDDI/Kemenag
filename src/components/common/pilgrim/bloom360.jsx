// BloomSimilar component
import React, { useEffect, useState } from 'react';

const Bloom360 = ({ selectedName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isBloomVisible] = useState(true);
  const [embedLink, setEmbedLink] = useState('');

  useEffect(() => {
    if (isBloomVisible && selectedName) {
      const searchPhrase = selectedName; // Use the selectedName as the search phrase
      const encodedSearchPhrase = encodeURIComponent(searchPhrase);
      const link = `https://bloom.neo4j.io/index.html?connectURL=neo4j%2Bs%3A%2F%2Fed48def5.databases.neo4j.io&_ga=2.182360096.687853126.1695008954-1427712525.1690905495&search=${encodedSearchPhrase}&perspective=Kemenag_Terbaru&run=true`;
      setEmbedLink(link);
    }
  }, [isBloomVisible, selectedName]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div style={containerStyle}>
      {!isLoggedIn && (
        <button onClick={handleLogin}>Login</button>
      )}
      {isLoggedIn && (
        <div style={bloomFrameStyle}>
          {embedLink && (
            <iframe
              src={embedLink}
              title="Neo4j Bloom Embed"
              width="100%"
              height="720px"
              frameBorder="0"
            />
          )}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  width: '100%',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const bloomFrameStyle = {
  marginTop: '10px',
};

export default Bloom360;
