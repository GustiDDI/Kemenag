// UserDetail.js
import React from 'react';
import { images } from '../../../assets';

const UserDetail = ({ user }) => {
  return (
    <div className="name-container">
      <div className="name">{user.nama}</div>
      <div className="name-details">
        <img src={images.foto} alt="Foto" className="small-image" />
        <p>Blood Pressure: {user.blood_pressure}</p>
        <p>Embarkasi Name: {user.emberkasi_name}</p>
        <p>Gender: {user.gender}</p>
        <p>Heart Rate: {user.heart_rate}</p>
        <p>KTP: {user.ktp}</p>
        <p>Latitude: {user.latitude}</p>
        <p>Longitude: {user.longitude}</p>
        <p>Medical Condition: {user.medical_condition}</p>
        <p>No Kloter: {user.no_kloter}</p>
        <p>Oxygen Level: {user.oxygen_level}</p>
        <p>Passport Jemaah: {user.passport_jemaah}</p>
        <p>Temperature: {user.temperature}</p>
        <p>Travel Name: {user.travel_name}</p>
        <p>Umur: {user.umur}</p>
      </div>
    </div>
  );
};

export default UserDetail;
