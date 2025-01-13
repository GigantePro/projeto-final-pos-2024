import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get('/todos/')
      .then(response => {
        console.log('ToDos fetched:', response.data); // Adicionando log para verificar os dados
        setTodos(response.data);
      })
      .catch(error => console.error('Erro ao buscar ToDos:', error));
  }, []);

  return (
    <div>
      <h2>ToDos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} - {todo.completed ? 'Concluído' : 'Pendente'}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;