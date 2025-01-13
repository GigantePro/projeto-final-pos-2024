import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({ post: '', body: '', email: '' });
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetchComments();
    fetchPosts();
  }, []);

  const fetchComments = () => {
    api.get('/comments/')
      .then(response => {
        console.log('Comments fetched:', response.data);
        setComments(response.data);
      })
      .catch(error => console.error('Erro ao buscar comentários:', error));
  };

  const fetchPosts = () => {
    api.get('/posts/')
      .then(response => {
        console.log('Posts fetched:', response.data);
        setPosts(response.data);
      })
      .catch(error => console.error('Erro ao buscar posts:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingComment) {
      setEditingComment({ ...editingComment, [name]: value });
    } else {
      setNewComment({ ...newComment, [name]: value });
    }
  };

  const handleCreateComment = () => {
    console.log('Creating comment:', newComment); // Adicionando log para depuração
    api.post('/comments/', newComment)
      .then(response => {
        console.log('Comment created:', response.data);
        setNewComment({ post: '', body: '', email: '' });
        fetchComments();
      })
      .catch(error => {
        console.error('Erro ao criar comentário:', error);
        if (error.response) {
          console.error('Erro detalhes:', error.response.data);
        }
      });
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleUpdateComment = () => {
    console.log('Updating comment:', editingComment); // Adicionando log para depuração
    api.put(`/comments/${editingComment.id}/`, editingComment)
      .then(response => {
        console.log('Comment updated:', response.data);
        setEditingComment(null);
        fetchComments();
      })
      .catch(error => console.error('Erro ao atualizar comentário:', error));
  };

  const handleDeleteComment = (commentId) => {
    console.log('Deleting comment:', commentId); // Adicionando log para depuração
    api.delete(`/comments/${commentId}/`)
      .then(response => {
        console.log('Comment deleted:', response.data);
        fetchComments();
      })
      .catch(error => console.error('Erro ao deletar comentário:', error));
  };

  const getPostTitle = (postId) => {
    const post = posts.find(post => post.id === postId);
    return post ? post.title : 'Desconhecido';
  };

  return (
    <div>
      <h2>Comentários</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{getPostTitle(comment.post)}</strong> ({comment.email})</p>
            <p>{comment.body}</p>
            <button onClick={() => handleEditComment(comment)}>Editar</button>
            <button onClick={() => handleDeleteComment(comment.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingComment ? 'Editar Comentário' : 'Criar Comentário'}</h3>
      <select
        name="post"
        value={editingComment ? editingComment.post : newComment.post}
        onChange={handleInputChange}
      >
        <option value="">Selecione um post</option>
        {posts.map(post => (
          <option key={post.id} value={post.id}>
            {post.title}
          </option>
        ))}
      </select>
      <input
        type="email"
        name="email"
        value={editingComment ? editingComment.email : newComment.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <textarea
        name="body"
        value={editingComment ? editingComment.body : newComment.body}
        onChange={handleInputChange}
        placeholder="Comentário"
      />
      <button onClick={editingComment ? handleUpdateComment : handleCreateComment}>
        {editingComment ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default CommentList;