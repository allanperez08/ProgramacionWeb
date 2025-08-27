import React from 'react';
import './Task.css';

const Task = ({ task, toggleTask, deleteTask }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="circle" onClick={() => toggleTask(task.id)}></div>
      <span onClick={() => toggleTask(task.id)}>{task.name}</span>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </div>
  );
};

export default Task;
