import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ user: '', title: '' });
  const [editingAlbum, setEditingAlbum] = useState(null);

  useEffect(() => {
    fetchAlbums();
    fetchUsers();
  }, []);

  const fetchAlbums = () => {
    api.get('/albums/')
      .then(response => {
        console.log('Albums fetched:', response.data);
        setAlbums(response.data);
      })
      .catch(error => console.error('Erro ao buscar álbuns:', error));
  };

  const fetchUsers = () => {
    api.get('/users/')
      .then(response => {
        console.log('Users fetched:', response.data);
        setUsers(response.data);
      })
      .catch(error => console.error('Erro ao buscar usuários:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAlbum) {
      setEditingAlbum({ ...editingAlbum, [name]: value });
    } else {
      setNewAlbum({ ...newAlbum, [name]: value });
    }
  };

  const handleCreateAlbum = () => {
    console.log('Creating album:', newAlbum); // Adicionando log para depuração
    api.post('/albums/', newAlbum)
      .then(response => {
        console.log('Album created:', response.data);
        setNewAlbum({ user: '', title: '' });
        fetchAlbums();
      })
      .catch(error => {
        console.error('Erro ao criar álbum:', error);
        if (error.response) {
          console.error('Erro detalhes:', error.response.data);
        }
      });
  };

  const handleEditAlbum = (album) => {
    setEditingAlbum(album);
  };

  const handleUpdateAlbum = () => {
    console.log('Updating album:', editingAlbum); // Adicionando log para depuração
    api.put(`/albums/${editingAlbum.id}/`, editingAlbum)
      .then(response => {
        console.log('Album updated:', response.data);
        setEditingAlbum(null);
        fetchAlbums();
      })
      .catch(error => console.error('Erro ao atualizar álbum:', error));
  };

  const handleDeleteAlbum = (albumId) => {
    console.log('Deleting album:', albumId); // Adicionando log para depuração
    api.delete(`/albums/${albumId}/`)
      .then(response => {
        console.log('Album deleted:', response.data);
        fetchAlbums();
      })
      .catch(error => console.error('Erro ao deletar álbum:', error));
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Desconhecido';
  };

  return (
    <div>
      <h2>Álbuns</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.title} - <strong>Usuário:</strong> {getUserName(album.user)}
            <button onClick={() => handleEditAlbum(album)}>Editar</button>
            <button onClick={() => handleDeleteAlbum(album.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingAlbum ? 'Editar Álbum' : 'Criar Álbum'}</h3>
      <select
        name="user"
        value={editingAlbum ? editingAlbum.user : newAlbum.user}
        onChange={handleInputChange}
      >
        <option value="">Selecione um usuário</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        value={editingAlbum ? editingAlbum.title : newAlbum.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <button onClick={editingAlbum ? handleUpdateAlbum : handleCreateAlbum}>
        {editingAlbum ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default AlbumList;