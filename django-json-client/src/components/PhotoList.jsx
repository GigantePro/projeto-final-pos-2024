import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    api.get('/photos/')
      .then(response => {
        console.log('Photos fetched:', response.data); // Adicionando log para verificar os dados
        setPhotos(response.data);
      })
      .catch(error => console.error('Erro ao buscar fotos:', error));
  }, []);

  return (
    <div>
      <h2>Fotos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;