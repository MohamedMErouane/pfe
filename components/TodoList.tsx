"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsername();
    updateCurrentDate(); // Initial call to update current date
    const interval = setInterval(updateCurrentDate, 86400000); // Update date every day (86400000 milliseconds = 1 day)
    return () => clearInterval(interval); // Cleanup interval on component unmount
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
      // Send the new task to the backend
      const response = await axios.post('/api/tasks', { description: newTask });

      // Update the local state with the newly added task received from the backend
      setTasks([...tasks, response.data]);
      
      // Clear the input field
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

  const updateCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <p className="text-lg text-black">Hi @{username} , set yourself up for success! 🚀</p>
      <h1 className="text-2xl font-normal my-4 text-black">What do you want to achieve?</h1>
      <p className="text-sm text-black text-right mb-4 ">☀️{currentDate} </p>
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
