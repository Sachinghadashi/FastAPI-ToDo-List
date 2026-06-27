import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TodoModal = ({ isOpen, onClose, onSave, todo = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Helper to format date for datetime-local input
  const formatInputDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Get timezone offset in minutes and subtract from date to get local ISO string
      const offset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
      return localISOTime;
    } catch (e) {
      return '';
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setPriority(todo.priority || 'Medium');
      setDueDate(formatInputDate(todo.due_date));
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
    setErrors({});
  }, [todo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title must be under 200 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <h2 className="text-xl font-bold text-dark-text">
            {todo ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-dark-muted hover:text-dark-text hover:bg-dark-border/50 transition duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
              Title <span className="text-brand-danger">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              placeholder="What needs to be done?"
              className={`w-full px-4 py-3 rounded-xl bg-dark-bg border ${
                errors.title ? 'border-brand-danger' : 'border-dark-border'
              } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
            />
            {errors.title && (
              <span className="block mt-1.5 text-xs text-brand-danger font-medium">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition"
              />
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
                Priority
              </label>
              <div className="flex bg-dark-bg border border-dark-border rounded-xl p-1">
                {['Low', 'Medium', 'High'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition duration-200 ${
                      priority === p
                        ? p === 'High'
                          ? 'bg-brand-danger text-white'
                          : p === 'Medium'
                          ? 'bg-brand-warning text-dark-bg'
                          : 'bg-brand-primary text-white'
                        : 'text-dark-muted hover:text-dark-text'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl font-semibold text-sm text-dark-muted hover:bg-dark-border/50 hover:text-dark-text transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition duration-200 shadow-lg shadow-brand-primary/20"
            >
              {todo ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
