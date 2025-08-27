import React, { useState, useEffect } from 'react';
import './App.css';
import Task from './components/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Gestión de Tareas</h1>
      <div className="task-input">
        <input type="text" placeholder="Nueva tarea" value={taskName} onChange={e => setTaskName(e.target.value)} />
        <button onClick={addTask}>Agregar</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter==='all'?'active':''}>Todas</button>
        <button onClick={() => setFilter('pending')} className={filter==='pending'?'active':''}>Pendientes</button>
        <button onClick={() => setFilter('completed')} className={filter==='completed'?'active':''}>Completadas</button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? <p>No hay tareas</p> :
          filteredTasks.map(task => <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />)
        }
      </div>
    </div>
  );
};

export default App;
