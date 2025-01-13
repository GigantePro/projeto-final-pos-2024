import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    api.get('/albums/')
      .then(response => {
        console.log('Albums fetched:', response.data); // Adicionando log para verificar os dados
        setAlbums(response.data);
      })
      .catch(error => console.error('Erro ao buscar álbuns:', error));
  }, []);

  return (
    <div>
      <h2>Álbuns</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;