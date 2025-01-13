import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get('/comments/')
      .then(response => {
        console.log('Comments fetched:', response.data); // Adicionando log para verificar os dados
        setComments(response.data);
      })
      .catch(error => console.error('Erro ao buscar comentários:', error));
  }, []);

  return (
    <div>
      <h2>Comentários</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.name}</strong> ({comment.email})</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;