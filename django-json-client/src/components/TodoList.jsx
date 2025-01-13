import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    api.get('/todos/')
      .then(response => {
        console.log('ToDos fetched:', response.data);
        setTodos(response.data);
      })
      .catch(error => console.error('Erro ao buscar ToDos:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTodo) {
      setEditingTodo({ ...editingTodo, [name]: value });
    } else {
      setNewTodo({ ...newTodo, [name]: value });
    }
  };

  const handleCreateTodo = () => {
    api.post('/todos/', newTodo)
      .then(response => {
        console.log('ToDo created:', response.data);
        setNewTodo({ title: '', completed: false });
        fetchTodos();
      })
      .catch(error => console.error('Erro ao criar ToDo:', error));
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = () => {
    api.put(`/todos/${editingTodo.id}/`, editingTodo)
      .then(response => {
        console.log('ToDo updated:', response.data);
        setEditingTodo(null);
        fetchTodos();
      })
      .catch(error => console.error('Erro ao atualizar ToDo:', error));
  };

  const handleDeleteTodo = (todoId) => {
    api.delete(`/todos/${todoId}/`)
      .then(response => {
        console.log('ToDo deleted:', response.data);
        fetchTodos();
      })
      .catch(error => console.error('Erro ao deletar ToDo:', error));
  };

  return (
    <div>
      <h2>ToDos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Concluído' : 'Pendente'}
            <button onClick={() => handleEditTodo(todo)}>Editar</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>{editingTodo ? 'Editar ToDo' : 'Criar ToDo'}</h3>
      <input
        type="text"
        name="title"
        value={editingTodo ? editingTodo.title : newTodo.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <label>
        <input
          type="checkbox"
          name="completed"
          checked={editingTodo ? editingTodo.completed : newTodo.completed}
          onChange={(e) => handleInputChange({ target: { name: 'completed', value: e.target.checked } })}
        />
        Concluído
      </label>
      <button onClick={editingTodo ? handleUpdateTodo : handleCreateTodo}>
        {editingTodo ? 'Atualizar' : 'Criar'}
      </button>
    </div>
  );
};

export default TodoList;