import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newPhoto, setNewPhoto] = useState({ album: '', title: '', url: '' });
  const [editingPhoto, setEditingPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
    fetchAlbums();
  }, []);

  const fetchPhotos = () => {
    api.get('/photos/')
      .then(response => {
        console.log('Photos fetched:', response.data);
        setPhotos(response.data);
      })
      .catch(error => console.error('Erro ao buscar fotos:', error));
  };

  const fetchAlbums = () => {
    api.get('/albums/')
      .then(response => {
        console.log('Albums fetched:', response.data);
        setAlbums(response.data);
      })
      .catch(error => console.error('Erro ao buscar álbuns:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPhoto) {
      setEditingPhoto({ ...editingPhoto, [name]: value });
    } else {
      setNewPhoto({ ...newPhoto, [name]: value });
    }
  };

  const handleCreatePhoto = () => {
    console.log('Creating photo:', newPhoto); // Adicionando log para depuração
    api.post('/photos/', newPhoto)
      .then(response => {
        console.log('Photo created:', response.data);
        setNewPhoto({ album: '', title: '', url: '' });
        fetchPhotos();
      })
      .catch(error => {
        console.error('Erro ao criar foto:', error);
        if (error.response) {
          console.error('Erro detalhes:', error.response.data);
        }
      });
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
  };

  const handleUpdatePhoto = () => {
    console.log('Updating photo:', editingPhoto); // Adicionando log para depuração
    api.put(`/photos/${editingPhoto.id}/`, editingPhoto)
      .then(response => {
        console.log('Photo updated:', response.data);
        setEditingPhoto(null);
        fetchPhotos();
      })
      .catch(error => console.error('Erro ao atualizar foto:', error));
  };

  const handleDeletePhoto = (photoId) => {
    console.log('Deleting photo:', photoId); // Adicionando log para depuração
    api.delete(`/photos/${photoId}/`)
      .then(response => {
        console.log('Photo deleted:', response.data);
        fetchPhotos();
      })
      .catch(error => console.error('Erro ao deletar foto:', error));
  };

  const getAlbumTitle = (albumId) => {
    const album = albums.find(album => album.id === albumId);
    return album ? album.title : 'Desconhecido';
  };

  return (
    <div>
      <h2>Fotos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
            <strong>Álbum:</strong> {getAlbumTitle(photo.album)}
            <button onClick={() => handleEditPhoto(photo)}>Editar</button>
            <button onClick={() => handleDeletePhoto(photo.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingPhoto ? 'Editar Foto' : 'Criar Foto'}</h3>
      <select
        name="album"
        value={editingPhoto ? editingPhoto.album : newPhoto.album}
        onChange={handleInputChange}
      >
        <option value="">Selecione um álbum</option>
        {albums.map(album => (
          <option key={album.id} value={album.id}>
            {album.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        value={editingPhoto ? editingPhoto.title : newPhoto.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <input
        type="text"
        name="url"
        value={editingPhoto ? editingPhoto.url : newPhoto.url}
        onChange={handleInputChange}
        placeholder="URL da Foto"
      />
      <button onClick={editingPhoto ? handleUpdatePhoto : handleCreatePhoto}>
        {editingPhoto ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default PhotoList;