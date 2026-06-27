import React, { useState, useEffect } from 'react';
import { todoService, dashboardService } from '../services/api';
import DashboardStats from '../components/DashboardStats';
import TodoCard from '../components/TodoCard';
import TodoModal from '../components/TodoModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Plus, KanbanSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All', 'Low', 'Medium', 'High'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [todosData, statsData] = await Promise.all([
        todoService.getAll(),
        dashboardService.getStats()
      ]);
      setTodos(todosData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load task data. Please try again.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await todoService.patchStatus(id, currentStatus);
      toast.success(currentStatus ? "Task marked as completed!" : "Task marked as pending.");
      fetchData(); // Silently update in background
    } catch (error) {
      console.error("Error patching status:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleSaveTodo = async (todoData) => {
    try {
      if (editingTodo) {
        await todoService.update(editingTodo.id, todoData);
        toast.success("Task updated successfully!");
      } else {
        await todoService.create(todoData);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      setEditingTodo(null);
      fetchData();
    } catch (error) {
      console.error("Error saving todo:", error);
      toast.error("Failed to save task.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.delete(id);
      toast.success("Task deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  // Filtering Logic
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && todo.status) ||
      (statusFilter === 'Pending' && !todo.status);

    const matchesPriority =
      priorityFilter === 'All' || todo.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark-text">Your Dashboard</h1>
          <p className="text-sm text-dark-muted mt-1">Keep track of your projects and organize your daily workflow</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/95 transition duration-200 shadow-lg shadow-brand-primary/20"
        >
          <Plus className="w-5 h-5" />
          <span>Add Todo</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <DashboardStats stats={stats} />

      {/* Filter and Search Bar section */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-muted pointer-events-none">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-dark-bg border border-dark-border text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition"
            />
          </div>

          {/* Filters (Status & Priority) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex bg-dark-bg border border-dark-border rounded-2xl p-1">
              {['All', 'Pending', 'Completed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    statusFilter === filter
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Priority Filter */}
            <div className="flex bg-dark-bg border border-dark-border rounded-2xl p-1">
              {['All', 'Low', 'Medium', 'High'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPriorityFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    priorityFilter === filter
                      ? 'bg-brand-accent text-white shadow-md'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Todo List Area */}
      {filteredTodos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEditClick}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-dark-card border border-dark-border rounded-3xl text-center">
          <div className="p-4 bg-dark-bg border border-dark-border rounded-2xl text-dark-muted mb-4">
            <KanbanSquare className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-dark-text">No tasks found</h3>
          <p className="text-sm text-dark-muted mt-1 max-w-sm">
            Try adjusting your filters, searching for something else, or create a brand new task.
          </p>
        </div>
      )}

      {/* Edit/Create Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
        }}
        onSave={handleSaveTodo}
        todo={editingTodo}
      />
    </div>
  );
};

export default Dashboard;
