import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { images } from '../../../assets';

const Map = ({ nama, latitude, longitude, dispatchData }) => {
  const [map, setMap] = useState(null);
  const userMarkerRef = useRef(null);
  const dispatchMarkersRef = useRef([]);
  const polylineRef = useRef(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance in km
    return distance.toFixed(2); // return distance in kilometers rounded to 2 decimal places
  };

  const createOrUpdatePolyline = () => {
    if (map && latitude && longitude && dispatchData.length > 0) {
      const polylineCoordinates = [
        [latitude, longitude],
        ...dispatchData.map(dispatch => [dispatch.dispatch_latitude, dispatch.dispatch_longitude]),
      ];

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(polylineCoordinates);
      } else {
        const polyline = L.polyline(polylineCoordinates, {
          color: 'blue',
          dashArray: '10, 10',
        }).addTo(map);
        polylineRef.current = polyline;
      }
    }
  };

  useEffect(() => {
    if (map) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([latitude, longitude]);
      } else {
        const userMarker = L.marker([latitude, longitude], {
          icon: L.icon({
            iconUrl: images.redmark,
            iconSize: [41, 41],
            iconAnchor: [18, 38],
          }),
        });
        userMarker.bindPopup(`<b>${nama}</b>`);
        userMarker.addTo(map);
        userMarkerRef.current = userMarker;
      }

      dispatchData.forEach((dispatch, index) => {
        let dispatchMarker;
        if (dispatchMarkersRef.current[index]) {
          dispatchMarker = dispatchMarkersRef.current[index];
          dispatchMarker.setLatLng([dispatch.dispatch_latitude, dispatch.dispatch_longitude]);
        } else {
          dispatchMarker = L.marker([dispatch.dispatch_latitude, dispatch.dispatch_longitude], {
            icon: L.icon({
              iconUrl: images.bluemark,
              iconSize: [41, 41],
              iconAnchor: [18, 38],
            }),
          }).addTo(map);
          dispatchMarkersRef.current[index] = dispatchMarker;
        }
        const distance = calculateDistance(
          latitude,
          longitude,
          dispatch.dispatch_latitude,
          dispatch.dispatch_longitude
        );
        dispatchMarker.bindPopup(`Distance ${dispatch.nama_dispatch} from pilgrim: ${distance} km`);
      });

      createOrUpdatePolyline();
    }
  }, [latitude, longitude, dispatchData, map, nama]);

  useEffect(() => {
    const mapInstance = L.map('map').setView([latitude, longitude], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [latitude, longitude]);

  useEffect(() => {
    if (map && latitude && longitude) {
      map.setView([latitude, longitude]);
    }
  }, [map, latitude, longitude]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
