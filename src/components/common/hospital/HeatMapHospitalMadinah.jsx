import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const HeatMapMadinah = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data/rumahsakit');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the data where kota is "Madinah"
        const madinahData = data.data.filter(item => item.kota_rumahsakit === 'Madinah');

        // Check if the map container is not already associated with a map
        const mapContainer = document.getElementById('map-madinah');
        if (!mapContainer._leaflet_id) {
          // Create the Leaflet map
          const map = L.map('map-madinah').setView([24.495486610589406, 39.56099005606697], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          // Create a heatmap data array based on hospital locations and available_room
          const heatmapData = madinahData.map(item => [
            item.rumahsakit_latitude,
            item.rumahsakit_longitude,
            item.available_room  // Use available_room as the weight
          ]);

          // Create a heatmap layer with custom radius function
          L.heatLayer(heatmapData, {
            radius: 30,  // Adjust this value based on your preference
            max: 1.0,  // Set max to 1 for proportionate radius
            maxZoom: 18,
            gradient: { 0.4: 'red', 1: 'green' }
          }).addTo(map);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div id="map-madinah" style={{ height: '600px', width: '100%' }}></div>;
};

export default HeatMapMadinah;
