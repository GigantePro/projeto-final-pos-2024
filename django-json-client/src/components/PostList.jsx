import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, setNewPost] = useState({ user: '', title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = () => {
    api.get('/posts/')
      .then(response => {
        console.log('Posts fetched:', response.data);
        setPosts(response.data);
      })
      .catch(error => console.error('Erro ao buscar posts:', error));
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
    if (editingPost) {
      setEditingPost({ ...editingPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleCreatePost = () => {
    console.log('Creating post:', newPost); // Adicionando log para depuração
    api.post('/posts/', newPost)
      .then(response => {
        console.log('Post created:', response.data);
        setNewPost({ user: '', title: '', body: '' });
        fetchPosts();
      })
      .catch(error => {
        console.error('Erro ao criar post:', error);
        if (error.response) {
          console.error('Erro detalhes:', error.response.data);
        }
      });
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = () => {
    console.log('Updating post:', editingPost); // Adicionando log para depuração
    api.put(`/posts/${editingPost.id}/`, editingPost)
      .then(response => {
        console.log('Post updated:', response.data);
        setEditingPost(null);
        fetchPosts();
      })
      .catch(error => console.error('Erro ao atualizar post:', error));
  };

  const handleDeletePost = (postId) => {
    console.log('Deleting post:', postId); // Adicionando log para depuração
    api.delete(`/posts/${postId}/`)
      .then(response => {
        console.log('Post deleted:', response.data);
        fetchPosts();
      })
      .catch(error => console.error('Erro ao deletar post:', error));
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Desconhecido';
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} - {post.body} <br />
            <strong>Usuário:</strong> {getUserName(post.user)}
            <button onClick={() => handleEditPost(post)}>Editar</button>
            <button onClick={() => handleDeletePost(post.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingPost ? 'Editar Post' : 'Criar Post'}</h3>
      <select
        name="user"
        value={editingPost ? editingPost.user : newPost.user}
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
        value={editingPost ? editingPost.title : newPost.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <textarea
        name="body"
        value={editingPost ? editingPost.body : newPost.body}
        onChange={handleInputChange}
        placeholder="Conteúdo"
      />
      <button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
        {editingPost ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default PostList;