import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando o React Router
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import CommentList from './components/CommentList';
import AlbumList from './components/AlbumList';
import PhotoList from './components/PhotoList';

const App = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Client para API Django</h1>

        {/* Links para navegação entre as páginas */}
        <nav>
          <ul>
            <li><a href="/users">Usuários</a></li>
            <li><a href="/todos">ToDos</a></li>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/comments">Comentários</a></li>
            <li><a href="/albums">Álbuns</a></li>
            <li><a href="/photos">Fotos</a></li>
          </ul>
        </nav>

        {/* Definindo as rotas */}
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/comments" element={<CommentList />} />
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/photos" element={<PhotoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
