import React from 'react';
import axios from 'axios';
import './executebutton.css';

const ExecuteButton = ({ apiData, onExecute }) => {
  const handleExecuteClick = async () => {
    try {
        console.log(apiData);
      // Call the API /api/v1/notification/wa with a POST request and send the data
      const response = await axios.post('http://192.168.18.191:5005/api/v1/notification/wa', apiData);

      
      onExecute(response.data); // Notify the parent component about the execution
    } catch (error) {
      console.error('Error executing API:', error);
    }
  };

  return (
    <div>
      <button className="round-button" onClick={handleExecuteClick}>
        Kirim Tim Dispatch Terdekat
      </button>
    </div>
  );
};

export default ExecuteButton;
