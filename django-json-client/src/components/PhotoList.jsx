import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    api.get('/photos')
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Erro ao buscar fotos:', error));
  }, []);

  return (
    <div>
      <h2>Fotos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} width="100" />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
