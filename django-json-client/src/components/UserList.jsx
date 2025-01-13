import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

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
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleCreateUser = () => {
    api.post('/users/', newUser)
      .then(response => {
        console.log('User created:', response.data);
        setNewUser({ name: '', email: '' });
        fetchUsers();
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    api.put(`/users/${editingUser.id}/`, editingUser)
      .then(response => {
        console.log('User updated:', response.data);
        setEditingUser(null);
        fetchUsers();
      })
      .catch(error => console.error('Erro ao atualizar usuário:', error));
  };

  const handleDeleteUser = (userId) => {
    api.delete(`/users/${userId}/`)
      .then(response => {
        console.log('User deleted:', response.data);
        fetchUsers();
      })
      .catch(error => console.error('Erro ao deletar usuário:', error));
  };

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEditUser(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingUser ? 'Editar Usuário' : 'Criar Usuário'}</h3>
      <input
        type="text"
        name="name"
        value={editingUser ? editingUser.name : newUser.name}
        onChange={handleInputChange}
        placeholder="Nome"
      />
      <input
        type="email"
        name="email"
        value={editingUser ? editingUser.email : newUser.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button onClick={editingUser ? handleUpdateUser : handleCreateUser}>
        {editingUser ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default UserList;