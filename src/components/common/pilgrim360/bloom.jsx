import React, { useEffect, useState } from 'react';
import FilterNama from './filternama';

const Bloom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isBloomVisible, setIsBloomVisible] = useState(false);
  const [embedLink, setEmbedLink] = useState('');

  const containerStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const bloomFrameStyle = {
    marginTop: '40px',
    display: isBloomVisible ? 'block' : 'none', // Display based on isBloomVisible
  };

  useEffect(() => {
    const isLoggedInFromCache = localStorage.getItem('isLoggedIn');
    if (isLoggedInFromCache === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleShowBloom = (isVisible) => {
    setIsBloomVisible(isVisible);

    // Generate the embedLink when showing Bloom
    if (isVisible && selectedOption) {
      const searchPhrase = `pilgrim360${selectedOption}`;
      const encodedSearchPhrase = encodeURIComponent(searchPhrase);
      const link = `https://bloom.neo4j.io/index.html?connectURL=neo4j%2Bs%3A%2F%2Fed48def5.databases.neo4j.io&_ga=2.182360096.687853126.1695008954-1427712525.1690905495&search=${encodedSearchPhrase}&perspective=Kemenag_Terbaru&run=true`;
      setEmbedLink(link);
    }
  };

  return (
    <div style={containerStyle}>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <FilterNama 
            handleSelectChange={handleSelectChange} 
            handleShowBloom={handleShowBloom} 
          />
          <button onClick={() => handleShowBloom(true)}>Show Bloom</button>
          <div style={bloomFrameStyle}>
            {embedLink && (
              <iframe
                src={embedLink}
                title="Neo4j Bloom Embed"
                width="100%"
                height="700px"
                frameBorder="0"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Bloom;
