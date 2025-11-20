import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const TodoApp = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`, getAuthHeaders());
      setTodos(response.data);
      setError('');
    } catch (error) {
      setError('Không thể tải danh sách todo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/todos`,
        { title, description, deadline: deadline || null },
        getAuthHeaders()
      );
      setTodos([response.data, ...todos]);
      setTitle('');
      setDescription('');
      setDeadline('');
      setError('');
    } catch (error) {
      setError('Không thể thêm todo');
      console.error(error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const response = await axios.put(
        `${API_URL}/todos/${todo.id}`,
        { completed: !todo.completed },
        getAuthHeaders()
      );
      setTodos(todos.map(t => t.id === todo.id ? response.data : t));
    } catch (error) {
      setError('Không thể cập nhật todo');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa todo này?')) return;

    try {
      await axios.delete(`${API_URL}/todos/${id}`, getAuthHeaders());
      setTodos(todos.filter(t => t.id !== id));
      setError('');
    } catch (error) {
      setError('Không thể xóa todo');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
              <p className="text-gray-600 mt-1">Xin chào, {user?.username}!</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Thêm Todo Mới</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleAddTodo}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Mô tả (tùy chọn)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="datetime-local"
                placeholder="Deadline (tùy chọn)..."
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Thêm Todo
              </button>
            </div>
          </form>
        </div>

        {/* Todos List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Danh Sách Todo ({todos.length})</h2>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có todo nào. Hãy thêm todo đầu tiên của bạn!
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 border rounded-lg flex items-start justify-between ${
                    todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed === 1}
                      onChange={() => handleToggleComplete(todo)}
                      className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          todo.completed === 1 ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2">
                        <p className="text-xs text-gray-400">
                          Tạo: {new Date(todo.created_at).toLocaleString('vi-VN')}
                        </p>
                        {todo.deadline && (
                          <p className={`text-xs font-medium ${
                            todo.completed === 1 
                              ? 'text-gray-400' 
                              : new Date(todo.deadline) < new Date()
                              ? 'text-red-600'
                              : new Date(todo.deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
                              ? 'text-orange-600'
                              : 'text-green-600'
                          }`}>
                            ⏰ Deadline: {new Date(todo.deadline).toLocaleString('vi-VN')}
                            {!todo.completed && new Date(todo.deadline) < new Date() && (
                              <span className="ml-1 font-bold">(Quá hạn!)</span>
                            )}
                            {!todo.completed && new Date(todo.deadline) > new Date() && new Date(todo.deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000) && (
                              <span className="ml-1 font-bold">(Sắp đến hạn!)</span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

