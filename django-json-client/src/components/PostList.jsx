import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Erro ao buscar posts:', error));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
