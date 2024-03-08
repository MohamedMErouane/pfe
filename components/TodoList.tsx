"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsername();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get('/api/user');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', { description: newTask });
      fetchTasks();
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.put(`/api/tasks/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <p className="text-lg text-black">Hi @{username} , set yourself up for success! 🚀</p>
      <h1 className="text-2xl font-bold my-4 text-black">What do you want to achieve?</h1>
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="p-2 mr-2 border rounded-md flex-grow text-black" // Changed text color to black
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">Add Task</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={`todo-item ${task.completed ? 'line-through' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id, task.completed)}
              className="mr-2"
            />
            <span>{task.description}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-auto text-red-500" // Added text color as red
            >
              <FaTrash /> {/* Render the delete icon */}
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .todo-item {
          background-color: #fff;
          padding: 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .todo-item.completed {
          text-decoration: line-through;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
